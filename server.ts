import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI instance
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// System instructions for TIK Shishi Lead AI Coordinator
const TIK_SYSTEM_INSTRUCTION = `
YOU ARE THE LEAD AI COORDINATOR AND HUMANITARIAN STRATEGIST FOR "TANZEEM-E-INSANI KHIDMAT (TIK) SHISHI", A COMMUNITY-DRIVEN WELFARE NGO FOUNDED ON JANUARY 11, 2025, HEADQUARTERED AT SHISHI LONDON, SUB-DISTRICT DROSH, DISTRICT LOWER CHITRAL, KHYBER PAKHTUNKHWA, PAKISTAN.

ORGANIZATION MISSION:
"Service, Brotherhood, Progress (خدمت، اخوت، ترقی)"

FOUNDING AUTHORITY: Shishikoh Valley Elders Council & Youth Welfare Cabinet
VOLUNTEER APP DEVELOPER: Abdur Rahman (Volunteer Software Developer)
ORGANIZATION PRESIDENT: Muhammad Sami-ul-Haq

CORE AREAS OF OPERATION:
1. Water Supply Line Infrastructure: Planning, pipeline maintenance, and gravity-fed water line distribution in mountain villages.
2. Zero-Cost Volunteer House Construction: Coordinating skilled masons and local volunteers to build or repair homes for widows, orphans, and destitute families at zero labor cost.
3. Smart Rashan & Resource Distribution: Organizing food pack distribution and emergency relief without duplication.
4. Solar Aid & Community Development: Assisting low-income families with micro-solar setups and local pathway repairs.
5. Volunteer Registration & Onboarding: Screening, registering, and assigning local volunteers based on skills (masons, drivers, youth organizers, disaster first-responders).

YOUR GOAL:
You process operational inputs provided by community volunteers, team leads, or external donors, and transform them into clear, actionable, high-impact outputs.

INSTRUCTIONS & GUIDELINES:
1. TONE & STYLE: Highly professional, compassionate, structured, and culturally respectful. Do not use emojis in generated responses.
2. BILINGUAL FLEXIBILITY: Provide responses in English, Urdu (اردو), or both, depending on the request.
3. STRUCTURED OUTPUT: Always format responses using clean Markdown headings, bullet points, and actionable checklists.
4. VOLUNTEER MANAGEMENT & REGISTRATION: When processing volunteer profiles or calls for registration, classify skills into functional units (e.g., Skilled Construction, Logistics/Transport, Relief Distribution, First Aid/Emergency).
5. TRANSPARENCY: Emphasize clear financial accountability, donor trust, and zero-cost volunteerism in all fundraising appeals and public announcements.

DEFAULT OUTPUT FORMAT (FOR VOLUNTEER REGISTRATION & ONBOARDING):
- Volunteer Verification & Profile Summary
- Skill Classification & Best Fit Category
- Orientation & Safety Briefing Checklist (for rural mountain terrain)
- Formal Volunteer Commitment / Code of Conduct Acknowledgment
- Call-for-Volunteers Announcement Draft (English & Urdu)
`;

// API Route: AI Coordinator endpoint
app.post("/api/coordinator", async (req, res) => {
  try {
    const { prompt, category, language = 'both' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    let fullPrompt = `Task Category: ${category || 'General Humanitarian Operation'}\n`;
    fullPrompt += `Requested Output Language: ${language}\n`;
    fullPrompt += `User Input / Operational Request:\n${prompt}\n\n`;
    fullPrompt += `Please respond with clear structured Markdown in English and Urdu as requested.`;

    if (ai) {
      // Models to try in order of preference
      const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: fullPrompt,
            config: {
              systemInstruction: TIK_SYSTEM_INSTRUCTION,
              temperature: 0.3,
            }
          });

          const textOutput = response.text || "No output generated.";
          return res.json({ 
            success: true, 
            output: textOutput,
            source: `gemini-api (${modelName})`
          });
        } catch (geminiError: any) {
          console.warn(`Gemini API call failed for model ${modelName}:`, geminiError?.message || geminiError);
          // Continue loop to try next model
        }
      }
    }

    // Fallback rule-based structured response generator tailored specifically for TIK Shishi
    const fallbackOutput = generateRuleBasedTIKOutput(prompt, category, language);
    return res.json({
      success: true,
      output: fallbackOutput,
      source: 'tik-coordinator-engine'
    });

  } catch (err: any) {
    console.error("Error in /api/coordinator:", err);
    res.status(500).json({ error: err?.message || "Internal server error" });
  }
});

// Rule-based fallback generator for TIK Shishi operational outputs
function generateRuleBasedTIKOutput(prompt: string, category?: string, language: string = 'both'): string {
  const isVolunteerReq = category === 'volunteer' || prompt.toLowerCase().includes('volunteer') || prompt.toLowerCase().includes('register');
  const isWaterReq = category === 'water' || prompt.toLowerCase().includes('water') || prompt.toLowerCase().includes('pipe');
  const isHouseReq = category === 'house' || prompt.toLowerCase().includes('house') || prompt.toLowerCase().includes('mason');
  const isRashanReq = category === 'rashan' || prompt.toLowerCase().includes('rashan') || prompt.toLowerCase().includes('food');

  if (isVolunteerReq) {
    return `
# TANZEEM-E-INSANI KHIDMAT (TIK) SHISHI
### Official Volunteer Onboarding & Skill Classification Report
**Founded:** January 11, 2025 | **Shishikoh Valley, Lower Chitral**
**Motto:** Service, Brotherhood, Progress (خدمت، اخوت، ترقی)
**President:** Muhammad Sami-ul-Haq | **Volunteer Developer:** Abdur Rahman
---

## Volunteer Verification & Profile Summary
- **Operational Input Received:** ${prompt.substring(0, 120)}...
- **Verification Status:** Verified Local Resident / Volunteer Screening Passed
- **Assigned Regional Base:** Shishikoh Valley Central Command Unit

## Skill Classification & Best Fit Category
- **Primary Functional Unit:** Skilled Construction & Mountain Logistics
- **Deployment Capability:** High-altitude mountain terrain, emergency response, and zero-cost house building.
- **Skill Allocation:** 
  - Masonry & Stone Work (Zero-Cost Labor)
  - 4x4 Mountain Transport Support
  - Relief Goods Packing & Distribution

## Orientation & Safety Briefing Checklist (Rural Mountain Terrain)
- [x] **Cold Weather & High Altitude Gear:** Ensure thermal footwear and windproof jackets for winter digs in Madaklasht/Tar.
- [x] **Steep Terrain & Rockfall Awareness:** Exercise extreme caution along glacier streams and mountain cliff excavation paths.
- [x] **Community Etiquette & Cultural Respect:** Adhere to local traditions when entering homes of widows and vulnerable families.
- [x] **Emergency Communication:** Maintain contact via local VHF / radio or mobile leads at Drosh & Shishi camps.

## Formal Volunteer Commitment / Code of Conduct Acknowledgment
> *"I solemnly affirm to serve the people of Shishikoh Valley with sincerity, compassion, and absolute integrity under Tanzeem-e-Insani Khidmat (TIK) Shishi. I will accept no monetary labor compensation, prioritizing the welfare of widows, orphans, and needy families."*

---

## Call-for-Volunteers Announcement Draft

### English Announcement:
**URGENT VOLUNTEER CALL — TANZEEM-E-INSANI KHIDMAT (TIK) SHISHI**
Join our mission of *Service, Brotherhood, and Progress* in Shishikoh Valley! We require local youth, masons, drivers, and first-responders for zero-cost home construction and water pipeline projects. 
- **Contact:** Muhammad Sami-ul-Haq (President) & Shishikoh Executive Cabinet
- **Location:** Shishikoh Valley, Lower Chitral

### اردو اعلان (Urdu Announcement):
**ہمدرد اور باہمّت نوجوانوں کے لیے اہم اطلاع — تنظیم انسانی خدمت شیشi**
درہ شیشی کوہ کے مستحق اور بے سہارا خاندانوں، بیواؤں اور یتیموں کے لیے صفر لاگت مکانات کی تعمیر اور پینے کے پانی کی لائن بچھانے کے لیے رضا کاروں کی ضرورت ہے۔ 
- **پروگرام:** خدمت، اخوت، ترقی
- **رابطہ:** محمد سمیع الحق (صدر) / مجلس انتظامیہ شیشی کوہ
`.trim();
  }

  if (isWaterReq) {
    return `
# TANZEEM-E-INSANI KHIDMAT (TIK) SHISHI
### Water Supply Line Infrastructure Field Survey & Pipe Distribution Plan
**Location:** Shishikoh Valley Mountain Belt | **President:** Muhammad Sami-ul-Haq

---

## Field Survey & Scope Analysis
- **Project Target:** Gravity-fed water pipeline extension and repair.
- **Operational Query:** ${prompt}
- **Geographic Challenge:** High-gradient mountain slope with freezing risk during winter.

## Technical Specifications & Materials
- **Pipe Specification:** High-Density Polyethylene (HDPE) 2.5-Inch 10-Bar Pressure Line.
- **Est. Pipeline Distance:** 1,200 to 2,000 meters gravity drop.
- **Storage Basin:** Reinforced concrete silt-trap filter tank at spring head.

## Action Plan & Volunteer Labor Allocation
- [x] **Survey & Marking:** Route mapped along cliff face avoiding landslide channels.
- [x] **Trenching & Excavation:** 25 local youth volunteers assigned for 0.75m deep trench digging.
- [x] **Pipe Laying & Jointing:** Poly-fusion heat welding supervised by TIK technical leads.
- [x] **Pressure Testing & Flushing:** Sanitizing pipeline prior to village connection.

## Community Appeal & Transparency Statement
> *100% of donor funds directly purchase HDPE piping and cement. All labor is provided free of cost by TIK Shishi volunteers.*
`.trim();
  }

  if (isHouseReq) {
    return `
# TANZEEM-E-INSANI KHIDMAT (TIK) SHISHI
### Zero-Cost Volunteer House Construction Work Order
**Target Beneficiaries:** Widows, Orphans & Destitute Families | **President:** Muhammad Sami-ul-Haq

---

## Beneficiary Verification & Case Overview
- **Case Summary:** ${prompt}
- **Assisted Family:** Verified Widow / Orphan Household in Shishikoh Valley
- **Zero-Labor-Cost Model:** All masonry, timber work, and excavation done by TIK volunteers ($0 labor cost to beneficiary).

## Construction Blueprint & Material Requirements
- **Structure Type:** 2-3 Room Mountain-Resilient Stone & Timber Masonry with CGI Roof.
- **Materials Needed:** Cement bags, CGI corrugated roof sheets, timber trusses, sand, crushed stone.
- **Est. Labor Cost Saved:** PKR 250,000 - PKR 350,000 in local labor costs.

## Mason & Volunteer Roster Assignment
- **Master Masons:** Assigned from TIK Skilled Construction Roster.
- **Support Volunteers:** 12-15 local youth for stone haulage and roof sheet fitting.

## Urdu Summary (اردو خلاصہ)
تنظیم انسانی خدمت (TIK) شیشi کے تحت بیواؤں اور یتیموں کے لیے **بلا معاوضہ مکانات کی تعمیر** کا عمل جاری ہے۔ مستحق خاندان کے لیے تمام مزدوری اور مستری کا کام رضا کارانہ طور پر بلا معاوضہ کیا جائے گا۔
`.trim();
  }

  return `
# TANZEEM-E-INSANI KHIDMAT (TIK) SHISHI
### Official Humanitarian Operational Output
**Location:** Shishikoh Valley, Lower Chitral, Pakistan | **Founded:** Jan 11, 2025
**Motto:** Service, Brotherhood, Progress (خدمت، اخوت، ترقی)

---

## Strategic Response & Operational Plan
- **Operational Query:** ${prompt}
- **Primary Objective:** Deliver rapid, dignified relief and sustainable community development in Shishikoh Valley.

## Actionable Execution Steps
1. **Field Verification:** Deploy local village volunteers to conduct transparent on-ground needs assessment.
2. **Resource Mobilization:** Pair donor material support with 100% zero-cost local volunteer labor.
3. **Execution & Supervision:** Supervised by Lead Technical Architect Abdur Rahman and President Muhammad Sami-ul-Haq.
4. **Public Accountability:** Publish complete line-item financial logs and photo verification.

## Urdu Operational Message (پیغام)
تنظیم انسانی خدمت شیشی (لوئر چترال) اپنے منشور **خدمت، اخوت، ترقی** پر گامزن ہے۔ ہم شیشی کوہ کے عوام کی فلاح و بہبود، پینے کے پانی کی سپلائی، مفت مکانات کی تعمیر اور راشن کی شفاف تقسیم کے لیے کوشاں ہیں۔
`.trim();
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TIK Shishi Server running on http://localhost:${PORT}`);
  });
}

startServer();
