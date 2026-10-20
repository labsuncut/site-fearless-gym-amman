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
    skip: 'Skip',
    nav_train: 'Train', nav_floor: 'The floor', nav_visit: 'Visit', nav_call: 'Call',
    hero_kicker: 'Gym and martial arts school · Khalda, Amman',
    hero_fear: 'FEAR', hero_less: 'LESS',
    hero_sub: 'Strength floor and combat room under one roof. Seven days a week, 6 AM to 11 PM.',
    cta_call: 'Call the gym', cta_wa: 'WhatsApp', cta_trial: 'Book a trial',
    open_now: 'Open now', closed_now: 'Closed now', closes: 'closes', opens: 'opens',
    wall: 'PLAY HARD',
    train_kicker: 'Train', train_title: 'Two rooms. One rule.',
    train_text: 'Lift heavy on the strength floor. Then go downstairs and hit something. Members use both.',
    strength_title: 'Strength floor', strength_text: 'Free weights, racks and machines by Technogym. Built for bodybuilding and strength training.',
    combat_title: 'Combat room', combat_text: 'Heavy bags, mats and a martial arts school. Classes for beginners and for fighters.',
    combat_note: 'Class list and times: confirm at the desk.',
    recovery_title: 'Recovery', recovery_text: 'Cryosauna sessions to recover faster between hard days.',
    facts_kicker: 'The facts',
    facts: [
      { big: '7', small: 'days a week' },
      { big: '6–11', small: '6 AM to 11 PM, every day' },
      { big: '2013', small: 'open in Amman since' },
      { big: 'Khalda', small: 'Wasfi At-Tall Street' }
    ],
    rules_kicker: 'The rule on the wall',
    rules: ['Show up.', 'Lift heavier than last week.', 'Respect the mat.', 'Leave the fear at the door.'],
    trial_kicker: 'First session', trial_title: 'Come and see it.',
    trial_text: 'Call the gym or send a WhatsApp and tell us when you want to come. A coach will show you both rooms.',
    f_name: 'Your name', f_goal: 'I want to train', f_when: 'I can come', f_send: 'Send on WhatsApp',
    goals: ['Strength', 'Combat', 'Both'], whens: ['Mornings', 'Afternoons', 'Evenings'],
    wa_msg: 'Hi Fearless, I want to book a first session.',
    wa_tpl: 'Hi Fearless, I am {name}. I want to train: {goal}. I can come: {when}.',
    visit_kicker: 'Visit', visit_title: 'Find us in Khalda',
    address: 'Wasfi At-Tall Street, Building 347, Khalda, Amman', address_note: 'Same building as Buffalo Wings & Rings. Step-free access.',
    hours_title: 'Hours', days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], today: 'today',
    directions: 'Get directions', map_title: 'Map to Fearless Gym',
    foot_line: 'Fearless Gym · Khalda, Amman', foot_fb: 'Facebook', foot_ig: 'Instagram',
    foot_preview: 'Preview build by FellowFlow. Not the gym\'s official site.',
    callbar: 'Call Fearless'
  },
  ar: {
    lang_btn: 'English',
    skip: 'تخطي',
    nav_train: 'التدريب', nav_floor: 'الصالة', nav_visit: 'الموقع', nav_call: 'اتصل',
    hero_kicker: 'نادي رياضي ومدرسة فنون قتالية · خلدا، عمّان',
    hero_fear: 'بلا', hero_less: 'خوف',
    hero_sub: 'صالة قوة وقاعة قتال تحت سقف واحد. سبعة أيام في الأسبوع، من ٦ صباحاً حتى ١١ مساءً.',
    cta_call: 'اتصل بالنادي', cta_wa: 'واتساب', cta_trial: 'احجز حصة تجريبية',
    open_now: 'مفتوح الآن', closed_now: 'مغلق الآن', closes: 'يغلق', opens: 'يفتح',
    wall: 'PLAY HARD',
    train_kicker: 'التدريب', train_title: 'قاعتان. قاعدة واحدة.',
    train_text: 'ارفع ثقيلاً في صالة القوة. ثم انزل واضرب الكيس. الأعضاء يستخدمون القاعتين.',
    strength_title: 'صالة القوة', strength_text: 'أوزان حرة وأجهزة من Technogym. مجهزة لكمال الأجسام وتدريب القوة.',
    combat_title: 'قاعة القتال', combat_text: 'أكياس ثقيلة وبساط ومدرسة فنون قتالية. حصص للمبتدئين وللمقاتلين.',
    combat_note: 'قائمة الحصص ومواعيدها: تأكد منها عند الاستقبال.',
    recovery_title: 'الاستشفاء', recovery_text: 'جلسات كرايو ساونا لتتعافى أسرع بين الأيام الصعبة.',
    facts_kicker: 'الحقائق',
    facts: [
      { big: '٧', small: 'أيام في الأسبوع' },
      { big: '٦–١١', small: 'من ٦ صباحاً حتى ١١ مساءً، كل يوم' },
      { big: '٢٠١٣', small: 'في عمّان منذ' },
      { big: 'خلدا', small: 'شارع وصفي التل' }
    ],
    rules_kicker: 'القاعدة على الحائط',
    rules: ['احضر.', 'ارفع أثقل من الأسبوع الماضي.', 'احترم الحلبة.', 'اترك الخوف عند الباب.'],
    trial_kicker: 'الحصة الأولى', trial_title: 'تعال وشاهد بنفسك.',
    trial_text: 'اتصل بالنادي أو أرسل واتساب وقل لنا متى تريد أن تأتي. سيأخذك مدرب في جولة على القاعتين.',
    f_name: 'اسمك', f_goal: 'أريد أن أتدرب', f_when: 'أستطيع الحضور', f_send: 'أرسل على واتساب',
    goals: ['قوة', 'قتال', 'الاثنين'], whens: ['صباحاً', 'بعد الظهر', 'مساءً'],
    wa_msg: 'مرحباً فيرلس، أريد حجز حصة أولى.',
    wa_tpl: 'مرحباً فيرلس، أنا {name}. أريد أن أتدرب: {goal}. أستطيع الحضور: {when}.',
    visit_kicker: 'الموقع', visit_title: 'تجدنا في خلدا',
    address: 'شارع وصفي التل، عمارة ٣٤٧، خلدا، عمّان', address_note: 'في نفس عمارة Buffalo Wings & Rings. مدخل بدون درج.',
    hours_title: 'ساعات العمل', days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], today: 'اليوم',
    directions: 'الاتجاهات', map_title: 'خريطة الوصول إلى فيرلس',
    foot_line: 'فيرلس جيم · خلدا، عمّان', foot_fb: 'فيسبوك', foot_ig: 'إنستغرام',
    foot_preview: 'نسخة تجريبية من FellowFlow. ليست الموقع الرسمي للنادي.',
    callbar: 'اتصل بفيرلس'
  }
};
