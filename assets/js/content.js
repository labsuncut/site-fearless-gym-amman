// FEARLESS: every word, number and fact on the site lives here, in English (en) and Arabic (ar).
// Sources (2026-10-20, search snippets only): Tipntag, Accessible Jordan, Tapology, Fitely, the gym's Facebook page
// and screenshots from its Instagram (photos, the official logo, the October 2026 class timetable, the coach cards).
// Coach Murad: his own Instagram (@ifbb_pro_murad_khmous, post of 24 Oct 2026 with the pro card) and the gym's coach card.
// His video and photos are approved for the site by Murad and the gym (Ali, 27 Oct 2026); the spelling Khmous is confirmed.
// Anything marked CONFIRM is waiting for the gym (or Murad) to confirm. Never replace it with a guess.

const BUSINESS = {
  name: 'Fearless Gym',
  timezone: 'Asia/Amman',
  phone: '+962792925017',              // CONFIRM: +962 79 292 5017 (Tipntag listing)
  phoneDisplay: '079 292 5017',
  whatsapp: '962792925017',            // CONFIRM: same mobile number, assumed to be on WhatsApp
  email: '',                           // not public; leave empty
  instagram: 'https://www.instagram.com/fearlessgymjo/',   // CONFIRM: the account that commented "Our champ" on Murad's post (same handle as Facebook)
  facebook: 'https://www.facebook.com/fearlessgymjo/',
  coachInstagram: 'https://www.instagram.com/ifbb_pro_murad_khmous/',
  address: 'Wasfi At-Tall St, Bldg 347, Khalda',   // CONFIRM: "same building as Buffalo Wings & Rings" (Tipntag)
  google: 'https://www.google.com/maps/search/?api=1&query=Fearless+Gym+Khalda+Amman',
  mapEmbed: 'https://www.google.com/maps?q=Fearless+Gym,+Wasfi+At-Tall+Street,+Khalda,+Amman&output=embed',
  // Opening hours, Sunday first: [open, close] in 24h. CONFIRM: listings say 7 days, 6:00 to 23:00.
  hours: [['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00']]
};

// Group classes: the October 2026 timetable from the gym's Instagram (three posts: Team Kru, boxing and kickboxing, Team Kombat).
// CONFIRM the current week at the desk. Days use the same index as hours: 0 = Sunday ... 6 = Saturday.
// Each class is [day, 'HH:MM', class key (TEXT.cls), team key (TEXT.teams)].
const SCHEDULE = [
  // Team Kru, Muay Thai: Saturday, Monday, Wednesday
  [6, '17:00', 'muay_kids', 'kru'], [1, '17:00', 'muay_kids', 'kru'], [3, '17:00', 'muay_kids', 'kru'],
  [6, '18:00', 'muay_adults', 'kru'], [1, '18:00', 'muay_adults', 'kru'], [3, '18:00', 'muay_adults', 'kru'],
  [6, '19:00', 'muay_adults2', 'kru'], [1, '19:00', 'muay_adults2', 'kru'], [3, '19:00', 'muay_adults2', 'kru'],
  [6, '20:00', 'muay_adv', 'kru'], [1, '20:00', 'muay_adv', 'kru'], [3, '20:00', 'muay_adv', 'kru'],
  // Boxing with Team Osama Maaita, kickboxing with Team Sultan Mashaqi: Saturday, Monday, Wednesday
  [6, '19:00', 'boxing', 'osama'], [1, '19:00', 'boxing', 'osama'], [3, '19:00', 'boxing', 'osama'],
  [6, '20:00', 'kickboxing', 'sultan'], [1, '20:00', 'kickboxing', 'sultan'], [3, '20:00', 'kickboxing', 'sultan'],
  // Team Kombat: BJJ, MMA and wrestling
  [6, '12:00', 'bjj_adults', 'kombat'], [6, '17:00', 'bjj_kids', 'kombat'], [6, '18:00', 'mma', 'kombat'],
  [0, '18:00', 'wrestling', 'kombat'], [0, '19:00', 'bjj_adults', 'kombat'],
  [1, '17:00', 'bjj_kids', 'kombat'], [1, '18:00', 'mma', 'kombat'],
  [2, '18:00', 'wrestling', 'kombat'], [2, '19:00', 'bjj_adults', 'kombat'],
  [3, '16:00', 'bjj_adults', 'kombat'], [3, '17:00', 'bjj_kids', 'kombat'], [3, '18:00', 'mma', 'kombat'],
  [4, '17:30', 'wrestling', 'kombat'], [4, '18:30', 'bjj_adults', 'kombat']
];

const TEXT = {
  en: {
    lang_btn: 'عربي',
    skip: 'Skip intro', replay: 'Replay the intro',
    nav_rooms: 'The warriors', nav_coach: 'Coach', nav_classes: 'Classes', nav_rule: 'The rule', nav_visit: 'Visit', nav_call: 'Call',
    hero_place: 'Khalda · Amman',
    hero_brand: 'FEARLESS', hero_brand_lines: 'FEAR|LESS', hero_video_label: 'Pad work in the combat room at Fearless Gym',
    hero_line: 'A gym and a martial arts school. Put the helmet on.',
    hero_hint: 'Scroll to step in',
    cta_call: 'Call the gym', cta_wa: 'WhatsApp', cta_trial: 'Book a first session',
    open_now: 'Open now', closed_now: 'Closed now', closes: 'closes', opens: 'opens',
    rooms_num: 'I', rooms_title: 'Two warriors',
    rooms_text: 'One gym, two halves of the same fighter. Lean into yours.',
    lifter_title: 'The Lifter', fighter_title: 'The Fighter', lifter_cta: 'Become fearless', pick_hint: 'Tap a side to lean in',
    camp_eyebrow: 'The camp', camp_text: 'What both warriors share. One membership, every door.',
    strength_title: 'The strength floor', strength_text: 'Free weights, racks and machines by Technogym. Built for bodybuilding and strength training.',
    combat_title: 'The combat room', combat_text: 'Heavy bags, mats and a martial arts school: Muay Thai, boxing, kickboxing, BJJ, MMA and wrestling. Classes for kids, beginners and fighters.',
    combat_note: 'See the class times',
    kitchen_title: 'The kitchen', kitchen_text: 'Eat better. Fresh bowls made at the gym, for after training.',
    // CONFIRM: physiotherapy on site, from the gym's own reel (28 Oct 2026). The cryosauna is out of order, so it is not mentioned.
    recovery_title: 'Physiotherapy', recovery_text: 'A physiotherapist at the gym. Assessment, treatment and rehab for whatever training strains.',
    physio_video_label: 'The gym\'s physiotherapist treating a member',
    photo_note: 'Video from the gym\'s own reels.',
    // Chapter II: the coach. Facts from Murad's own Instagram post (24 Oct 2026) and the gym's coach card.
    coach_num: 'II', coach_eyebrow: 'IFBB Pro · Classic Physique',
    coach_title: 'Train with the best',
    coach_name: 'Coach Murad Khmous',
    coach_text: 'Fearless\'s bodybuilding coach earned his IFBB Pro card at the Lyft Oman Pro Qualifier in Muscat, October 2026. Ten years of chasing it. Now he coaches on this floor.',
    coach_text2: 'Bodybuilding coaching at Fearless. Ask for Murad at the desk, or send a WhatsApp.',
    coach_cta: 'Train with Murad', coach_ig: 'Murad on Instagram',
    coach_card_cap: 'The pro card. Muscat, October 2026.',
    coach_video_label: 'Coach Murad Khmous posing on stage at the Lyft Oman Pro Qualifier',
    coach_note: 'Go support Coach Murad on Instagram',
    coach_wa: 'Hi Fearless, I want to train with Coach Murad.',
    classes_num: 'III', classes_title: 'Fearless time',
    classes_text: 'Group classes in the combat room. Pick a day. Save your spot: call or WhatsApp the gym.',
    classes_note: 'October 2026 timetable, from the gym\'s Instagram. Check the current week at the desk.',
    day_tabs: 'Pick a day', no_classes: 'No group classes today. The floor is open.',
    teams: { kru: 'Team Kru · Muay Thai', osama: 'Team Osama Maaita', sultan: 'Team Sultan Mashaqi', kombat: 'Team Kombat' },
    cls: { muay_kids: 'Muay Thai kids', muay_adults: 'Muay Thai adults', muay_adults2: 'Muay Thai adults 2', muay_adv: 'Muay Thai advanced', boxing: 'Boxing', kickboxing: 'Kickboxing', bjj_adults: 'BJJ adults', bjj_kids: 'BJJ kids', mma: 'MMA', wrestling: 'Wrestling' },
    day_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wall_num: 'IV', wall_title: 'The rule on the wall',
    wall: 'PLAY HARD',
    wall_text: 'Two words, painted above the racks. Everything else follows from them.',
    rules: ['Show up.', 'Lift heavier than last week.', 'Respect the mat.', 'Leave the fear at the door.'],
    // Chapter V: Ask the coach. A chat of the questions people ask most. Answers use only facts already on this page.
    // Items with wait: true are placeholders until the gym answers (CONFIRM at launch); they stay out of the FAQ data for Google.
    faq_num: 'V', faq_title: 'Ask the coach',
    faq_text: 'The questions people ask us most. Tap one and the gym answers.',
    faq_who: 'Fearless Gym', faq_status: 'Common questions', faq_asks: 'Questions',
    faq_hello: 'Hey. Ask us anything. Tap a question below.',
    faq_more: 'Something else? WhatsApp us',
    faq_wa: 'Hi Fearless, I have a question: ',
    faq: [
      { q: 'I\'ve never trained. Can I still join?', a: 'Yes. Fearless has classes for kids, beginners and fighters. Muay Thai runs from adults to advanced, so you start where you are. Tell us on WhatsApp what you want to train.' },
      { q: 'What time are you open?', a: 'Every day, 6 AM to 11 PM. Most group classes start between 5 and 8 PM. The timetable on this page has every class.' },
      { q: 'Can I come and see the gym first?', a: 'Yes. Send a WhatsApp and say when you want to come. A coach will walk you through both rooms.' },
      { q: 'How much is a membership?', a: 'Prices aren\'t on the site yet. Send us a WhatsApp and the desk will tell you the current prices.', wait: true },
      { q: 'Do you have classes for kids?', a: 'Yes. Muay Thai kids and BJJ kids, both at 5 PM on Saturday, Monday and Wednesday.' },
      { q: 'Can I train with Coach Murad?', a: 'Yes. Murad coaches bodybuilding at Fearless. Ask for him at the desk, or send a WhatsApp.' },
      { q: 'Where are you exactly?', a: 'Wasfi At-Tall Street, Building 347, Khalda. Same building as Buffalo Wings & Rings, with step-free access.' },
      { q: 'Is there anything for after training?', a: 'The kitchen makes fresh bowls at the gym, and there is a physiotherapist for injuries and recovery.' },
      { q: 'Are there women-only hours?', a: 'Send us a WhatsApp and we\'ll tell you the options that fit your week.', wait: true },
      { q: 'What should I bring?', a: 'Comfortable training clothes and water. For combat classes, ask us on WhatsApp what gear you need for your first session.', wait: true }
    ],
    trial_num: 'VI', trial_title: 'Come and see it',
    trial_text: 'Call or send a WhatsApp and say when you want to come. A coach will walk you through both rooms.',
    f_name: 'Your name', f_goal: 'I want to train', f_when: 'I can come', f_send: 'Send on WhatsApp',
    goals: ['Strength', 'Combat', 'Both', 'A class', 'With Coach Murad'], whens: ['Mornings', 'Afternoons', 'Evenings'],
    wa_msg: 'Hi Fearless, I want to book a first session.',
    wa_tpl: 'Hi Fearless, I am {name}. I want to train: {goal}. I can come: {when}.',
    visit_num: 'VII', visit_title: 'Khalda',
    address: 'Wasfi At-Tall Street, Building 347, Khalda, Amman', address_note: 'Same building as Buffalo Wings & Rings. Step-free access.',
    hours_title: 'Hours', days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], today: 'today',
    every_day: 'Seven days a week', since: 'Training in Amman since 2013',
    directions: 'Get directions', map_title: 'Map to Fearless Gym',
    foot_line: 'Fearless Gym · Khalda, Amman', foot_fb: 'Facebook', foot_ig: 'Instagram',
    foot_preview: 'Preview build by FellowFlow. Not the gym\'s official site.',
    callbar: 'Call Fearless'
  },
  ar: {
    lang_btn: 'English',
    skip: 'تخطي المقدمة', replay: 'أعد المقدمة',
    nav_rooms: 'المحاربان', nav_coach: 'المدرب', nav_classes: 'الحصص', nav_rule: 'القاعدة', nav_visit: 'الموقع', nav_call: 'اتصل',
    hero_place: 'خلدا · عمّان',
    hero_brand: 'بلا خوف', hero_brand_lines: 'بلا|خوف', hero_video_label: 'تدريب على الوسائد في قاعة القتال في فيرلس جيم',
    hero_line: 'نادي رياضي ومدرسة فنون قتالية. البس الخوذة.',
    hero_hint: 'مرّر لتدخل',
    cta_call: 'اتصل بالنادي', cta_wa: 'واتساب', cta_trial: 'احجز حصتك الأولى',
    open_now: 'مفتوح الآن', closed_now: 'مغلق الآن', closes: 'يغلق', opens: 'يفتح',
    rooms_num: 'I', rooms_title: 'محاربان',
    rooms_text: 'نادٍ واحد، ونصفان لمقاتل واحد. مِل إلى نصفك.',
    lifter_title: 'الرافع', fighter_title: 'المقاتل', lifter_cta: 'كن بلا خوف', pick_hint: 'اضغط على جانب لتقترب',
    camp_eyebrow: 'المعسكر', camp_text: 'ما يتشاركه المحاربان. اشتراك واحد، كل الأبواب.',    strength_title: 'صالة القوة', strength_text: 'أوزان حرة وأجهزة من Technogym. مجهزة لكمال الأجسام وتدريب القوة.',
    combat_title: 'قاعة القتال', combat_text: 'أكياس ثقيلة وبساط ومدرسة فنون قتالية: مواي تاي، ملاكمة، كيك بوكسينغ، جوجيتسو، MMA ومصارعة. حصص للأطفال والمبتدئين والمقاتلين.',
    combat_note: 'شاهد مواعيد الحصص',
    kitchen_title: 'المطبخ', kitchen_text: 'كُل أفضل. أطباق طازجة تُحضَّر في النادي، لما بعد التمرين.',
    recovery_title: 'العلاج الطبيعي', recovery_text: 'أخصائي علاج طبيعي داخل النادي. تقييم وعلاج وتأهيل لكل ما يُجهده التمرين.',
    physio_video_label: 'أخصائي العلاج الطبيعي في النادي يعالج أحد الأعضاء',
    photo_note: 'الفيديو من ريلز النادي.',
    coach_num: 'II', coach_eyebrow: 'IFBB Pro · كلاسيك فيزيك',
    coach_title: 'تدرّب مع الأفضل',
    coach_name: 'الكوتش مراد خموس',
    coach_text: 'مدرب كمال الأجسام في فيرلس حصل على بطاقة IFBB Pro في تصفيات Lyft Oman Pro في مسقط، أكتوبر ٢٠٢٦. عشر سنوات من السعي وراء الحلم. واليوم يدرّب على هذه الصالة.',
    coach_text2: 'تدريب كمال أجسام في فيرلس. اسأل عن مراد عند الاستقبال، أو أرسل واتساب.',
    coach_cta: 'تدرّب مع مراد', coach_ig: 'مراد على إنستغرام',
    coach_card_cap: 'بطاقة المحترفين. مسقط، أكتوبر ٢٠٢٦.',
    coach_video_label: 'الكوتش مراد خموس على المسرح في تصفيات Lyft Oman Pro',
    coach_note: 'ادعم الكوتش مراد على إنستغرام',
    coach_wa: 'مرحباً فيرلس، أريد أن أتدرب مع الكوتش مراد.',
    classes_num: 'III', classes_title: 'وقت فيرلس',
    classes_text: 'الحصص الجماعية في قاعة القتال. اختر يوماً. احجز مكانك: اتصل أو أرسل واتساب للنادي.',
    classes_note: 'جدول أكتوبر ٢٠٢٦ من إنستغرام النادي. تأكد من جدول الأسبوع الحالي عند الاستقبال.',
    day_tabs: 'اختر يوماً', no_classes: 'لا حصص جماعية اليوم. الصالة مفتوحة.',
    teams: { kru: 'فريق كرو · مواي تاي', osama: 'فريق أسامة معايطة', sultan: 'فريق سلطان مشاقي', kombat: 'فريق كومبات' },
    cls: { muay_kids: 'مواي تاي أطفال', muay_adults: 'مواي تاي كبار', muay_adults2: 'مواي تاي كبار ٢', muay_adv: 'مواي تاي متقدم', boxing: 'ملاكمة', kickboxing: 'كيك بوكسينغ', bjj_adults: 'جوجيتسو كبار', bjj_kids: 'جوجيتسو أطفال', mma: 'MMA', wrestling: 'مصارعة' },
    day_short: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    wall_num: 'IV', wall_title: 'القاعدة على الحائط',
    wall: 'PLAY HARD',
    wall_text: 'كلمتان مرسومتان فوق الرفوف. كل ما عداهما يأتي بعدهما.',
    rules: ['احضر.', 'ارفع أثقل من الأسبوع الماضي.', 'احترم البساط.', 'اترك الخوف عند الباب.'],
    faq_num: 'V', faq_title: 'اسأل المدرب',
    faq_text: 'أكثر الأسئلة التي تصلنا. اضغط على سؤال ويجيبك النادي.',
    faq_who: 'فيرلس جيم', faq_status: 'أسئلة شائعة', faq_asks: 'الأسئلة',
    faq_hello: 'أهلاً. اسألنا أي شيء. اضغط على سؤال في الأسفل.',
    faq_more: 'سؤال آخر؟ راسلنا على واتساب',
    faq_wa: 'مرحباً فيرلس، عندي سؤال: ',
    faq: [
      { q: 'لم أتدرب من قبل. هل أستطيع الانضمام؟', a: 'نعم. في فيرلس حصص للأطفال والمبتدئين والمقاتلين. المواي تاي من مستوى الكبار حتى المتقدم، فتبدأ من حيث أنت. أخبرنا على واتساب ماذا تريد أن تتدرب.' },
      { q: 'متى تفتحون؟', a: 'كل يوم من ٦ صباحاً حتى ١١ مساءً. معظم الحصص الجماعية تبدأ بين ٥ و٨ مساءً. كل الحصص في الجدول في هذه الصفحة.' },
      { q: 'هل أستطيع زيارة النادي أولاً؟', a: 'نعم. أرسل واتساب وقل متى تريد أن تأتي. سيأخذك مدرب في جولة على القاعتين.' },
      { q: 'كم سعر الاشتراك؟', a: 'الأسعار غير منشورة على الموقع بعد. أرسل لنا واتساب وسيخبرك الاستقبال بالأسعار الحالية.' },
      { q: 'هل عندكم حصص للأطفال؟', a: 'نعم. مواي تاي أطفال وجوجيتسو أطفال، كلاهما الساعة ٥ مساءً أيام السبت والاثنين والأربعاء.' },
      { q: 'هل أستطيع التدرب مع الكوتش مراد؟', a: 'نعم. مراد يدرّب كمال الأجسام في فيرلس. اسأل عنه عند الاستقبال، أو أرسل واتساب.' },
      { q: 'أين مكانكم بالضبط؟', a: 'شارع وصفي التل، عمارة ٣٤٧، خلدا. في نفس عمارة Buffalo Wings & Rings، ومدخل بدون درج.' },
      { q: 'هل هناك شيء لما بعد التمرين؟', a: 'المطبخ يحضّر أطباقاً طازجة في النادي، وهناك أخصائي علاج طبيعي للإصابات والتعافي.' },
      { q: 'هل توجد ساعات مخصصة للسيدات؟', a: 'أرسل لنا واتساب وسنخبرك بالخيارات التي تناسب أسبوعك.' },
      { q: 'ماذا أحضر معي؟', a: 'ملابس تمرين مريحة وماء. لحصص القتال، اسألنا على واتساب عن المعدات التي تحتاجها في حصتك الأولى.' }
    ],
    trial_num: 'VI', trial_title: 'تعال وشاهد بنفسك',
    trial_text: 'اتصل أو أرسل واتساب وقل متى تريد أن تأتي. سيأخذك مدرب في جولة على القاعتين.',
    f_name: 'اسمك', f_goal: 'أريد أن أتدرب', f_when: 'أستطيع الحضور', f_send: 'أرسل على واتساب',
    goals: ['قوة', 'قتال', 'الاثنين', 'حصة جماعية', 'مع الكوتش مراد'], whens: ['صباحاً', 'بعد الظهر', 'مساءً'],
    wa_msg: 'مرحباً فيرلس، أريد حجز حصة أولى.',
    wa_tpl: 'مرحباً فيرلس، أنا {name}. أريد أن أتدرب: {goal}. أستطيع الحضور: {when}.',
    visit_num: 'VII', visit_title: 'خلدا',
    address: 'شارع وصفي التل، عمارة ٣٤٧، خلدا، عمّان', address_note: 'في نفس عمارة Buffalo Wings & Rings. مدخل بدون درج.',
    hours_title: 'ساعات العمل', days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], today: 'اليوم',
    every_day: 'سبعة أيام في الأسبوع', since: 'ندرّب في عمّان منذ ٢٠١٣',
    directions: 'الاتجاهات', map_title: 'خريطة الوصول إلى فيرلس',
    foot_line: 'فيرلس جيم · خلدا، عمّان', foot_fb: 'فيسبوك', foot_ig: 'إنستغرام',
    foot_preview: 'نسخة تجريبية من FellowFlow. ليست الموقع الرسمي للنادي.',
    callbar: 'اتصل بفيرلس'
  }
};
