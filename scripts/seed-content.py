#!/usr/bin/env python3
"""One-off generator for the starting content (English + Arabic).

Run once to create content/*.json. After that, content is edited in TinaCMS
(or by hand) and this script is not needed again.

Text conventions used everywhere:
  *word*   -> shown in the accent style (italic gold)
  line break in a headline -> a new line
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = os.path.join(ROOT, "content")
os.makedirs(os.path.join(C, "projects"), exist_ok=True)

U = lambda pid: f"https://images.unsplash.com/photo-{pid}"
PH = dict(
    open=U("1600607687939-ce8a6c25118c"), boho=U("1631679706909-1844bbd07221"), console=U("1618219908412-a29a1bb7b86e"),
    bedroom=U("1540518614846-7eded433c457"), bedroom2=U("1505693416388-ac5ce068fe85"), redroom=U("1522708323590-d24dbb6b0267"),
    kitchen=U("1556911220-bff31c812dba"), villa=U("1600585154340-be6161a56a0c"), pool=U("1600573472592-401b489a3cdc"),
    ext=U("1600566753190-17f0baa2a6c3"), yellow=U("1586023492125-27b2c045efd7"), sofa=U("1618221195710-dd6b41faaea6"),
    white=U("1616486338812-3dadae4b4ace"), cozy=U("1493663284031-b7e3aefcae8e"), bright=U("1600210492486-724fe5c67fb0"),
    lounge=U("1600121848594-d8644e57abab"), view=U("1560448204-e02f11c3d0e2"),
)

def bi(en, ar): return {"en": en, "ar": ar}
def write(name, data):
    with open(os.path.join(C, name), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2); f.write("\n")

# ------------------------------------------------------------------ site
write("site.json", {
    "email": "info@binteriors.ae",
    "phone": "+971 00 000 0000",
    "instagramLabel": "@binteriors",
    "instagramUrl": "#",
    "formEndpoint": "",
    "location": bi("United Arab Emirates", "الإمارات العربية المتحدة"),
    "siteTitle": bi("B Interiors — Interior Design by Bayan Jijakli", "B Interiors — تصميم داخلي من بيان جيجكلي"),
    "siteDescription": bi("B Interiors is the interior design studio of Bayan Jijakli. Elegant, timeless residential and commercial interiors in the UAE.",
                          "B Interiors استوديو التصميم الداخلي لبيان جيجكلي. تصاميم سكنية وتجارية أنيقة وخالدة في الإمارات."),
    "footerAbout": bi("Considered, timeless interiors designed by Bayan Jijakli — homes that feel as good as they look.",
                      "تصاميم داخلية مدروسة وخالدة من بيان جيجكلي — بيوت تبدو جميلة وتمنح شعورًا أجمل."),
})

# -------------------------------------------------------------------- ui
write("ui.json", {
    "nav": {"home": bi("Home", "الرئيسية"), "about": bi("About", "نبذة"), "services": bi("Services", "الخدمات"),
            "portfolio": bi("Portfolio", "الأعمال"), "contact": bi("Contact", "تواصل")},
    "buttons": {"startProject": bi("Start a project", "ابدأ مشروعك"), "viewPortfolio": bi("View portfolio", "شاهد الأعمال"),
                "meetBayan": bi("Meet Bayan", "تعرّف على بيان"), "workWithMe": bi("Work with me", "تعاون معي"),
                "send": bi("Send enquiry", "إرسال الطلب")},
    "common": {"scroll": bi("Scroll", "مرّر"), "estBadge": bi("Est. B Interiors", "استوديو B Interiors"),
               "menu": bi("Menu", "القائمة")},
    "projects": {"allProjects": bi("All projects", "كل المشاريع"), "previous": bi("Previous project", "المشروع السابق"),
                 "next": bi("Next project", "المشروع التالي"), "brief": bi("The brief", "الفكرة"),
                 "briefTitle": bi("What we set out to *do.*", "ما أردنا *تحقيقه.*"),
                 "beforeAfter": bi("Before & after", "قبل وبعد"), "transformation": bi("The *transformation.*", "*التحوّل.*"),
                 "beforeAfterIntro": bi("Drag the handle across each photo to compare the space before and after.",
                                        "اسحب المقبض عبر كل صورة لمقارنة المساحة قبل التصميم وبعده."),
                 "before": bi("Before", "قبل"), "after": bi("After", "بعد"), "drag": bi("Drag to compare", "اسحب للمقارنة"),
                 "type": bi("Type", "النوع"), "property": bi("Property", "العقار"), "year": bi("Year", "السنة"),
                 "location": bi("Location", "الموقع"), "scope": bi("Scope", "نطاق العمل")},
    "categories": {"all": bi("All", "الكل"), "residential": bi("Residential", "سكني"),
                   "commercial": bi("Commercial", "تجاري"), "styling": bi("Styling", "تنسيق")},
    "contact": {"email": bi("Email", "البريد الإلكتروني"), "phone": bi("Phone / WhatsApp", "الهاتف / واتساب"),
                "studio": bi("Studio", "الاستوديو"), "follow": bi("Follow", "تابعنا"), "name": bi("Your name", "الاسم"),
                "phoneField": bi("Phone", "الهاتف"), "projectType": bi("Project type", "نوع المشروع"),
                "message": bi("Tell me about your project", "حدّثني عن مشروعك"),
                "typeResidential": bi("Residential", "سكني"), "typeCommercial": bi("Commercial", "تجاري"),
                "typeStyling": bi("Styling & Furnishing", "تنسيق وتأثيث"), "typeConsultation": bi("Consultation", "استشارة"),
                "error": bi("Something went wrong. Please email us directly.", "حدث خطأ ما. يرجى مراسلتنا مباشرة بالبريد الإلكتروني.")},
    "footer": {"explore": bi("Explore", "استكشف"), "services": bi("Services", "الخدمات"), "contact": bi("Contact", "تواصل"),
               "rights": bi("All rights reserved", "جميع الحقوق محفوظة")},
})

# ------------------------------------------------------------------ home
write("home.json", {
    "hero": {
        "eyebrow": bi("Interior Design Studio · UAE", "استوديو تصميم داخلي · الإمارات"),
        "headline": bi("Spaces with\nquiet *elegance*\n& soul.", "مساحات\nب*أناقة هادئة*\nوروح."),
        "lead": bi("I’m Bayan Jijakli. I design calm, layered, beautifully tailored interiors — where every detail is considered and nothing is accidental.",
                   "أنا بيان جيجكلي. أصمّم مساحات هادئة، متعددة الطبقات ومفصّلة بعناية — حيث كل تفصيل مدروس ولا شيء فيه محض صدفة."),
        "photo": PH["open"], "photoAlt": bi("Modern open-plan living room", "غرفة معيشة مفتوحة عصرية"),
    },
    "marquee": [bi("Residential Design", "التصميم السكني"), bi("Space Planning", "تخطيط المساحات"),
                bi("Bespoke Furniture", "أثاث مصمَّم خصيصًا"), bi("Colour & Materials", "الألوان والخامات"),
                bi("Styling", "التنسيق"), bi("Project Management", "إدارة المشاريع")],
    "studio": {
        "photo": PH["boho"], "photoAlt": bi("Boho living room", "غرفة معيشة بطابع بوهيمي"),
        "caption": bi("Concept · Craft · Calm", "فكرة · حِرفة · هدوء"),
        "eyebrow": bi("The Studio", "الاستوديو"),
        "title": bi("Design that feels *effortless*, because it’s been thought through.", "تصميم يبدو *سهلًا*، لأنه مدروس بعناية."),
        "paragraphs": [
            bi("B Interiors is a boutique studio led by Bayan Jijakli. From the first sketch to the final styled shelf, each project is shaped around the way you live — blending refined materials, soft light and timeless form into homes with a sense of ease.",
               "B Interiors استوديو بوتيكي بقيادة بيان جيجكلي. من أول رسمة حتى آخر رفٍّ منسّق، يُصمَّم كل مشروع وفق طريقة عيشك — بدمج خامات راقية وإضاءة ناعمة وخطوط خالدة لبيوتٍ تفيض راحة."),
            bi("No templates, no trends for trend’s sake. Just spaces that are personal, polished and built to last.",
               "لا قوالب جاهزة ولا موضة لأجل الموضة. فقط مساحات شخصية متقنة صُنعت لتدوم."),
        ],
    },
})

# ----------------------------------------------------------------- about
write("about.json", {
    "header": {"eyebrow": bi("About", "نبذة"), "title": bi("Hello, I’m *Bayan.*", "مرحبًا، أنا *بيان.*"),
               "lead": bi("Interior designer, space-maker and founder of B Interiors.",
                          "تصميم داخلي وصناعة مساحات — خلف B Interiors."),
               "photo": PH["boho"]},
    "story": {
        "photo": PH["console"], "photoAlt": bi("Interior detail", "تفصيل داخلي"), "caption": bi("Bayan Jijakli", "بيان جيجكلي"),
        "eyebrow": bi("My Story", "قصتي"),
        "title": bi("Design is how a space *makes you feel.*", "التصميم هو الشعور الذي *تمنحه المساحة.*"),
        "paragraphs": [
            bi("I believe the best interiors aren’t loud — they’re felt. They hold you the moment you walk in. That belief shapes every project I take on at B Interiors.",
               "أؤمن بأن أجمل المساحات ليست الصاخبة، بل التي تُحَسّ. تحتضنك منذ لحظة دخولك. هذا الإيمان يوجّه كل مشروع أتولّاه في B Interiors."),
            bi("With years of experience designing homes and commercial spaces, I work closely with each client to understand how they live, what they love, and what they need — then translate that into a space that is refined, functional and unmistakably theirs.",
               "بخبرة سنوات في تصميم البيوت والمساحات التجارية، أعمل عن قرب مع كل عميل لأفهم كيف يعيش وما يحب وما يحتاج، ثم أحوّل ذلك إلى مساحة راقية وعملية وتشبهه تمامًا."),
            bi("I stay hands-on from first concept to final styling, so the vision you approve is the one that gets delivered.",
               "أتابع كل مرحلة بنفسي، من أول فكرة حتى اللمسة الأخيرة، لتصلك الرؤية التي اعتمدتها كما هي."),
        ],
    },
    "principles": {
        "eyebrow": bi("What guides every project", "ما يوجّه كل مشروع"), "title": bi("Three *principles*", "ثلاثة *مبادئ*"),
        "items": [
            {"title": bi("Timeless over trendy", "الخلود قبل الموضة"),
             "text": bi("Classic proportions, honest materials and a restrained palette — spaces that stay beautiful for decades, not seasons.",
                        "نِسَب كلاسيكية وخامات أصيلة ولوحة ألوان هادئة — مساحات تبقى جميلة لعقود لا لمواسم.")},
            {"title": bi("Personal by design", "شخصي بالتصميم"),
             "text": bi("Every brief begins with listening. Your routines, your taste and your story shape the result — never a formula.",
                        "كل مشروع يبدأ بالإصغاء. روتينك وذوقك وقصتك هي ما يصوغ النتيجة — لا قالب جاهز.")},
            {"title": bi("Detail, always", "التفاصيل دائمًا"),
             "text": bi("From joinery lines to the way light falls at 5pm, the small decisions are what elevate a room from nice to remarkable.",
                        "من خطوط النجارة إلى سقوط الضوء عند الخامسة مساءً، القرارات الصغيرة هي التي ترتقي بالغرفة من جميلة إلى مدهشة.")},
        ],
    },
    "process": {
        "eyebrow": bi("How We Work", "كيف نعمل"), "title": bi("A clear, calm *process*", "عملية *واضحة* وهادئة"),
        "steps": [
            {"title": bi("Discover", "اكتشاف"), "text": bi("We talk through your space, lifestyle, taste and budget to define the brief.", "نتحدث عن مساحتك ونمط حياتك وذوقك وميزانيتك لنحدد المطلوب.")},
            {"title": bi("Design", "تصميم"), "text": bi("Concept boards, layouts, materials and 3D visuals — refined until it feels right.", "لوحات أفكار ومخططات وخامات وتصورات ثلاثية الأبعاد — نصقلها حتى تبدو في مكانها الصحيح.")},
            {"title": bi("Deliver", "تنفيذ"), "text": bi("Sourcing, procurement and site coordination with trusted craftspeople.", "توريد وشراء وتنسيق في الموقع مع حِرفيين موثوقين.")},
            {"title": bi("Style", "تنسيق"), "text": bi("The final layer — art, textiles, objects — and the space is ready to live in.", "الطبقة الأخيرة — الفن والأقمشة والقطع — وتصبح المساحة جاهزة للعيش.")},
        ],
    },
})

# -------------------------------------------------------------- services
def svc(en_t, ar_t, en_d, ar_d, en_s, ar_s):
    return {"title": bi(en_t, ar_t), "description": bi(en_d, ar_d), "scope": [bi(a, b) for a, b in zip(en_s, ar_s)]}
write("services.json", {
    "header": {"eyebrow": bi("Services", "الخدمات"), "title": bi("Tailored to *you*, start to finish.", "مصمَّمة *لك*، من البداية إلى النهاية."),
               "lead": bi("Whether you need a full transformation or a trusted second opinion, there’s a way to work together.",
                          "سواء احتجت إلى تحوّل كامل أو إلى رأي خبير موثوق، هناك طريقة للعمل معًا.")},
    "items": [
        svc("Residential Design", "التصميم السكني",
            "Complete interior design for villas, apartments and penthouses — from layout and finishes to lighting and furnishings.",
            "تصميم داخلي متكامل للفلل والشقق والبنتهاوس — من التخطيط والتشطيبات إلى الإضاءة والأثاث.",
            ["Space planning & layouts", "Concept & mood boards", "3D visualisation", "Joinery & bespoke furniture design", "Material & colour selection"],
            ["تخطيط المساحات والمخططات", "المفاهيم ولوحات الأفكار", "تصورات ثلاثية الأبعاد", "النجارة وتصميم الأثاث الخاص", "اختيار الخامات والألوان"]),
        svc("Commercial Interiors", "المساحات التجارية",
            "Welcoming, brand-led environments for boutiques, offices, restaurants and clinics that leave a lasting impression.",
            "بيئات مرحِّبة تعبّر عن العلامة التجارية للبوتيكات والمكاتب والمطاعم والعيادات، وتترك أثرًا يدوم.",
            ["Brand-aligned concepts", "Functional space planning", "Lighting design", "FF&E specification", "Site supervision"],
            ["مفاهيم متوافقة مع العلامة", "تخطيط وظيفي للمساحة", "تصميم الإضاءة", "مواصفات الأثاث والتجهيزات", "الإشراف على الموقع"]),
        svc("Styling & Furnishing", "التنسيق والتأثيث",
            "The finishing touches. Sourcing furniture, art, rugs and accessories to complete a room with warmth and personality.",
            "اللمسات الأخيرة. اختيار الأثاث والفن والسجاد والإكسسوارات لإكمال الغرفة بدفء وشخصية.",
            ["Furniture sourcing", "Art & accessory curation", "Soft furnishings", "Installation & styling day", "Refresh of existing rooms"],
            ["اختيار الأثاث", "انتقاء الأعمال الفنية والإكسسوارات", "المفروشات الناعمة", "يوم التركيب والتنسيق", "تجديد الغرف القائمة"]),
        svc("Design Consultation", "استشارة التصميم",
            "One-to-one guidance for those who want expert direction — in-person or online — and the confidence to do the rest.",
            "إرشاد فردي لمن يريد توجيهًا خبيرًا — حضوريًا أو عبر الإنترنت — وثقة لإكمال الباقي بنفسه.",
            ["On-site or virtual sessions", "Written recommendations", "Colour & layout advice", "Shopping lists", "Project reviews"],
            ["جلسات في الموقع أو عن بُعد", "توصيات مكتوبة", "نصائح الألوان والتخطيط", "قوائم التسوّق", "مراجعة المشاريع"]),
    ],
})

# ------------------------------------------------------------- portfolio
write("portfolio.json", {
    "header": {"eyebrow": bi("Portfolio", "الأعمال"), "title": bi("Selected *work*", "أعمال *مختارة*"),
               "lead": bi("A look at spaces designed with care.", "نظرة على مساحات صُمّمت بعناية."),
               "photo": PH["white"]},
})

# --------------------------------------------------------------- contact
write("contact.json", {
    "header": {"eyebrow": bi("Contact", "تواصل"), "title": bi("Let’s create something *beautiful.*", "لنصنع شيئًا *جميلًا.*"),
               "lead": bi("Tell me about your space and what you have in mind. I reply within two working days.",
                          "أخبرني عن مساحتك وما يدور في ذهنك. أردّ خلال يومي عمل.")},
    "info": {"eyebrow": bi("Get in touch", "ابقَ على تواصل"), "title": bi("Say *hello.*", "قل *مرحبًا.*")},
    "thanks": bi("Thank you — your message is on its way. I’ll be in touch very soon.",
                 "شكرًا لك — رسالتك في طريقها إليّ. سأتواصل معك قريبًا جدًا."),
})

# -------------------------------------------------------------- projects
def project(slug, order, name, cat, prop, year, line, brief, scope, hero, pairs):
    write(f"projects/{slug}.json", {
        "order": order, "name": bi(*name), "category": cat, "property": bi(*prop), "year": year,
        "location": bi("United Arab Emirates", "الإمارات العربية المتحدة"),
        "line": bi(*line), "brief": bi(*brief), "scope": [bi(a, b) for a, b in scope],
        "heroImage": hero, "cardImage": hero,
        "pairs": [{"caption": bi(*cap), "before": "", "after": img} for cap, img in pairs],
    })

project("arch-residence", 1, ("The Arch Residence", "إقامة القوس"), "residential", ("Villa", "فيلا"), "2025",
        ("A family villa rebuilt around light, glass and a quiet material palette.", "فيلا عائلية أُعيد بناؤها حول الضوء والزجاج ولوحة خامات هادئة."),
        ("The clients wanted a home that opened to the garden and felt calm from the first step inside. We reworked the plan around the arch, softened the entrance sequence and layered timber, stone and linen throughout.",
         "أراد العملاء بيتًا ينفتح على الحديقة ويمنح الهدوء من أول خطوة. أعدنا بناء المخطط حول القوس، ولطّفنا مدخل البيت، ووزّعنا الخشب والحجر والكتان في كل مكان."),
        [("Space planning", "تخطيط المساحات"), ("Concept & materials", "المفهوم والخامات"), ("Custom joinery", "نجارة خاصة"), ("Lighting design", "تصميم الإضاءة"), ("Furniture & styling", "الأثاث والتنسيق")],
        PH["villa"], [(("The façade", "الواجهة"), PH["villa"]), (("Garden terrace", "تراس الحديقة"), PH["pool"]), (("Entrance court", "فناء المدخل"), PH["ext"])])
project("noir-lounge", 2, ("Noir Lounge", "صالة نوار"), "styling", ("Apartment", "شقة"), "2025",
        ("A moody, tailored living space styled in charcoal, brass and soft light.", "مساحة معيشة داكنة الطابع ومفصّلة بدرجات الفحم والنحاس والضوء الناعم."),
        ("A compact city apartment that needed to feel generous and grown-up. We worked in deep neutrals, added warm metal accents and built a lighting plan that changes the room from day to evening.",
         "شقة صغيرة في المدينة أرادت أن تبدو رحبة وراقية. اعتمدنا ألوانًا داكنة هادئة وأضفنا لمسات معدنية دافئة، وصمّمنا الإضاءة لتتبدّل الغرفة من النهار إلى المساء."),
        [("Styling & furnishing", "التنسيق والتأثيث"), ("Lighting layers", "طبقات الإضاءة"), ("Soft furnishings", "المفروشات الناعمة"), ("Art curation", "انتقاء الأعمال الفنية")],
        PH["lounge"], [(("The lounge", "الصالة"), PH["lounge"]), (("Reading corner", "ركن القراءة"), PH["cozy"]), (("Sofa wall", "جدار الأريكة"), PH["sofa"])])
project("atelier-boutique", 3, ("Atelier Boutique", "بوتيك أتيليه"), "commercial", ("Retail", "تجزئة"), "2024",
        ("A boutique interior that lets the product and the materials do the talking.", "تصميم بوتيك يترك المنتج والخامات تتحدث."),
        ("A small retail space with a clear brief: feel like a private showroom, not a shop. We built the layout around a few considered moments: warm timber, rattan and a mirror that doubles the room.",
         "مساحة بيع صغيرة بمهمة واضحة: أن تبدو كصالة عرض خاصة لا كمتجر. بنينا المخطط حول لحظات قليلة مدروسة: خشب دافئ وروطان ومرآة تضاعف الغرفة."),
        [("Brand-aligned concept", "مفهوم متوافق مع العلامة"), ("Retail planning", "تخطيط المساحة التجارية"), ("Fixtures & joinery", "تجهيزات ونجارة"), ("Lighting design", "تصميم الإضاءة"), ("Site supervision", "الإشراف على الموقع")],
        PH["console"], [(("Entrance wall", "جدار المدخل"), PH["console"]), (("Display area", "منطقة العرض"), PH["bright"]), (("Fitting room", "غرفة القياس"), PH["white"])])
project("gold-room", 4, ("The Gold Room", "الغرفة الذهبية"), "residential", ("Penthouse", "بنتهاوس"), "2024",
        ("A penthouse suite layered in linen, leather and golden light.", "جناح بنتهاوس بطبقات من الكتان والجلد والضوء الذهبي."),
        ("The owner asked for a hotel-calm bedroom with a personal edge. We kept the palette quiet, added one rich colour moment and invested in textiles you want to touch.",
         "طلب المالك غرفة نوم بهدوء الفنادق مع لمسة شخصية. حافظنا على لوحة ألوان هادئة وأضفنا لحظة لونية غنية واستثمرنا في أقمشة تغري باللمس."),
        [("Space planning", "تخطيط المساحات"), ("Bespoke headboard", "لوح رأس السرير خاص"), ("Textiles & bedding", "الأقمشة والمفروشات"), ("Lighting design", "تصميم الإضاءة"), ("Styling", "التنسيق")],
        PH["bedroom"], [(("Main bedroom", "غرفة النوم الرئيسية"), PH["bedroom"]), (("Guest suite", "جناح الضيوف"), PH["bedroom2"]), (("Dressing area", "منطقة الملابس"), PH["redroom"])])
project("garden-light", 5, ("Garden Light", "ضوء الحديقة"), "residential", ("Villa", "فيلا"), "2023",
        ("Indoor-outdoor living that follows the sun through the day.", "عيش داخلي-خارجي يتتبّع الشمس على مدار اليوم."),
        ("A villa with generous glazing and a pool that deserved a better relationship with the rooms around it. We aligned materials inside and out so the garden reads as one more room.",
         "فيلا بواجهات زجاجية واسعة ومسبح يستحق علاقة أفضل بالغرف المحيطة. وحّدنا الخامات في الداخل والخارج لتُقرأ الحديقة غرفةً إضافية."),
        [("Concept & materials", "المفهوم والخامات"), ("Outdoor furniture", "أثاث خارجي"), ("Joinery", "نجارة"), ("Lighting design", "تصميم الإضاءة"), ("Project management", "إدارة المشروع")],
        PH["pool"], [(("Pool terrace", "تراس المسبح"), PH["pool"]), (("The elevation", "الواجهة"), PH["villa"]), (("Living view", "إطلالة المعيشة"), PH["view"])])
project("scarlet-corner", 6, ("Scarlet Corner", "الركن القرمزي"), "styling", ("Townhouse", "تاون هاوس"), "2023",
        ("One bold chair, a calm room, and a corner everyone wants to sit in.", "كرسي جريء واحد، غرفة هادئة، وركن يتمنى الجميع الجلوس فيه."),
        ("A townhouse that was well built but lacked personality. A restrained palette with a single scarlet moment gave the main room a focal point, and layered accessories made it feel lived in.",
         "منزل متكامل البناء لكنه يفتقر إلى الشخصية. لوحة ألوان هادئة مع لمسة قرمزية واحدة منحت الغرفة الرئيسية نقطة جذب، وإكسسوارات متعددة الطبقات جعلتها تبدو مسكونة بالحياة."),
        [("Styling & furnishing", "التنسيق والتأثيث"), ("Colour consultation", "استشارة الألوان"), ("Soft furnishings", "المفروشات الناعمة"), ("Art & accessories", "الفن والإكسسوارات")],
        PH["redroom"], [(("The corner", "الركن"), PH["redroom"]), (("Living area", "منطقة المعيشة"), PH["boho"]), (("Reading nook", "ركن القراءة"), PH["yellow"])])
print("content written to", C)
