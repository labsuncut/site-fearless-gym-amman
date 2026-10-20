// FEARLESS: every word, number and fact on the site lives here, in English (en) and Arabic (ar).
// Sources (2026-10-20, search snippets only): Tipntag, Accessible Jordan, Tapology, Fitely, the gym's Facebook page
// and three photos from its Instagram. Anything marked CONFIRM is waiting for the gym to confirm. Never replace it with a guess.

const BUSINESS = {
  name: 'Fearless Gym',
  timezone: 'Asia/Amman',
  phone: '+962792925017',              // CONFIRM: +962 79 292 5017 (Tipntag listing)
  phoneDisplay: '079 292 5017',
  whatsapp: '962792925017',            // CONFIRM: same mobile number, assumed to be on WhatsApp
  email: '',                           // not public; leave empty
  instagram: '',                       // CONFIRM: handle not found in search; add when the gym gives it
  facebook: 'https://www.facebook.com/fearlessgymjo/',
  address: 'Wasfi At-Tall St, Bldg 347, Khalda',   // CONFIRM: "same building as Buffalo Wings & Rings" (Tipntag)
  google: 'https://www.google.com/maps/search/?api=1&query=Fearless+Gym+Khalda+Amman',
  mapEmbed: 'https://www.google.com/maps?q=Fearless+Gym,+Wasfi+At-Tall+Street,+Khalda,+Amman&output=embed',
  // Opening hours, Sunday first: [open, close] in 24h. CONFIRM: listings say 7 days, 6:00 to 23:00.
  hours: [['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00']]
};

const TEXT = {
  en: {
    lang_btn: 'عربي',
    skip: 'Skip intro', replay: 'Replay the intro',
    nav_rooms: 'The rooms', nav_rule: 'The rule', nav_visit: 'Visit', nav_call: 'Call',
    hero_place: 'Khalda · Amman',
    hero_fear: 'FEAR', hero_less: 'LESS',
    hero_line: 'A gym and a martial arts school. Put the helmet on.',
    hero_hint: 'Scroll to lift the visor',
    cta_call: 'Call the gym', cta_wa: 'WhatsApp', cta_trial: 'Book a first session',
    open_now: 'Open now', closed_now: 'Closed now', closes: 'closes', opens: 'opens',
    rooms_num: 'I', rooms_title: 'Two rooms',
    rooms_text: 'The strength floor upstairs. The combat room below. One membership, both doors.',
    strength_title: 'The strength floor', strength_text: 'Free weights, racks and machines by Technogym. Built for bodybuilding and strength training.',
    combat_title: 'The combat room', combat_text: 'Heavy bags, mats and a martial arts school. Classes for beginners and for fighters.',
    combat_note: 'Class list and times: confirm at the desk.',
    recovery_title: 'Recovery', recovery_text: 'Cryosauna sessions to recover faster between hard days.',
    photo_note: 'Photos from the gym\'s Instagram, low resolution. Originals to come.',
    wall_num: 'II', wall_title: 'The rule on the wall',
    wall: 'PLAY HARD',
    wall_text: 'Two words, painted above the racks. Everything else follows from them.',
    rules: ['Show up.', 'Lift heavier than last week.', 'Respect the mat.', 'Leave the fear at the door.'],
    trial_num: 'III', trial_title: 'Come and see it',
    trial_text: 'Call or send a WhatsApp and say when you want to come. A coach will walk you through both rooms.',
    f_name: 'Your name', f_goal: 'I want to train', f_when: 'I can come', f_send: 'Send on WhatsApp',
    goals: ['Strength', 'Combat', 'Both'], whens: ['Mornings', 'Afternoons', 'Evenings'],
    wa_msg: 'Hi Fearless, I want to book a first session.',
    wa_tpl: 'Hi Fearless, I am {name}. I want to train: {goal}. I can come: {when}.',
    visit_num: 'IV', visit_title: 'Khalda',
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
    nav_rooms: 'القاعتان', nav_rule: 'القاعدة', nav_visit: 'الموقع', nav_call: 'اتصل',
    hero_place: 'خلدا · عمّان',
    hero_fear: 'بلا', hero_less: 'خوف',
    hero_line: 'نادي رياضي ومدرسة فنون قتالية. البس الخوذة.',
    hero_hint: 'مرّر لترفع القناع',
    cta_call: 'اتصل بالنادي', cta_wa: 'واتساب', cta_trial: 'احجز حصتك الأولى',
    open_now: 'مفتوح الآن', closed_now: 'مغلق الآن', closes: 'يغلق', opens: 'يفتح',
    rooms_num: 'I', rooms_title: 'قاعتان',
    rooms_text: 'صالة القوة في الأعلى. قاعة القتال في الأسفل. اشتراك واحد، بابان.',
    strength_title: 'صالة القوة', strength_text: 'أوزان حرة وأجهزة من Technogym. مجهزة لكمال الأجسام وتدريب القوة.',
    combat_title: 'قاعة القتال', combat_text: 'أكياس ثقيلة وبساط ومدرسة فنون قتالية. حصص للمبتدئين وللمقاتلين.',
    combat_note: 'قائمة الحصص ومواعيدها: تأكد منها عند الاستقبال.',
    recovery_title: 'الاستشفاء', recovery_text: 'جلسات كرايو ساونا لتتعافى أسرع بين الأيام الصعبة.',
    photo_note: 'الصور من إنستغرام النادي بدقة منخفضة. الأصلية قادمة.',
    wall_num: 'II', wall_title: 'القاعدة على الحائط',
    wall: 'PLAY HARD',
    wall_text: 'كلمتان مرسومتان فوق الرفوف. كل ما عداهما يأتي بعدهما.',
    rules: ['احضر.', 'ارفع أثقل من الأسبوع الماضي.', 'احترم البساط.', 'اترك الخوف عند الباب.'],
    trial_num: 'III', trial_title: 'تعال وشاهد بنفسك',
    trial_text: 'اتصل أو أرسل واتساب وقل متى تريد أن تأتي. سيأخذك مدرب في جولة على القاعتين.',
    f_name: 'اسمك', f_goal: 'أريد أن أتدرب', f_when: 'أستطيع الحضور', f_send: 'أرسل على واتساب',
    goals: ['قوة', 'قتال', 'الاثنين'], whens: ['صباحاً', 'بعد الظهر', 'مساءً'],
    wa_msg: 'مرحباً فيرلس، أريد حجز حصة أولى.',
    wa_tpl: 'مرحباً فيرلس، أنا {name}. أريد أن أتدرب: {goal}. أستطيع الحضور: {when}.',
    visit_num: 'IV', visit_title: 'خلدا',
    address: 'شارع وصفي التل، عمارة ٣٤٧، خلدا، عمّان', address_note: 'في نفس عمارة Buffalo Wings & Rings. مدخل بدون درج.',
    hours_title: 'ساعات العمل', days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], today: 'اليوم',
    every_day: 'سبعة أيام في الأسبوع', since: 'ندرّب في عمّان منذ ٢٠١٣',
    directions: 'الاتجاهات', map_title: 'خريطة الوصول إلى فيرلس',
    foot_line: 'فيرلس جيم · خلدا، عمّان', foot_fb: 'فيسبوك', foot_ig: 'إنستغرام',
    foot_preview: 'نسخة تجريبية من FellowFlow. ليست الموقع الرسمي للنادي.',
    callbar: 'اتصل بفيرلس'
  }
};
