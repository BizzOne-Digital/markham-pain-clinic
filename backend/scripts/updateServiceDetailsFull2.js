// Full, non-condensed rewrite for the second batch of 7 services.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const DETAILS = [
  {
    slug: 'electrotherapeutic-modalities',
    description: 'Electrotherapeutic modalities are widely used in physiotherapy to support recovery, reduce discomfort, and improve muscle and nerve function. At Remarkable Physiotherapy we use advanced electrotherapy techniques as part of a structured treatment plan to help individuals return to daily activities with confidence.',
    howItWorks: [
      { title: 'Transcutaneous Electrical Nerve Stimulation (TENS)', description: 'Helps reduce discomfort by interrupting signals sent to the brain.' },
      { title: 'Electrical Muscle Stimulation (EMS)', description: 'Activates muscles to improve strength and function.' },
      { title: 'Interferential Current Therapy (IFC)', description: 'Targets deeper tissues for improved circulation and reduced swelling.' },
      { title: 'Ultrasound Therapy', description: 'Uses sound waves to promote tissue repair.' },
      { title: 'Laser Therapy', description: 'Encourages cellular activity and tissue regeneration.' },
    ],
    benefits: ['Non-invasive and safe', 'Can be combined with exercise and manual techniques', 'Helps activate muscles that are difficult to engage', 'Supports faster return to daily activities', 'Suitable for a wide range of age groups'],
    whoCanBenefit: ['You have ongoing muscle or joint discomfort', 'You are recovering from an injury or surgery', 'You experience reduced muscle strength or activation', 'You want to improve mobility and function'],
    conditionsTreated: ['Back and neck discomfort', 'Sports-related injuries', 'Joint conditions such as arthritis', 'Muscle strains and ligament sprains', 'Post-surgical rehabilitation', 'Nerve-related conditions like sciatica'],
    treatmentProcess: [
      'Assessment — understanding your symptoms, movement patterns, and physical limitations to determine the most suitable electrotherapy approach',
      'During Treatment — electrodes or applicators placed on the skin; you may feel a mild tingling or pulsing sensation; sessions typically last 10–30 minutes with intensity adjusted for comfort',
    ],
    whyChooseUs: [
      { title: 'Experienced Physiotherapists', description: 'Trained in using advanced electrotherapeutic equipment and techniques, ensuring each session is purposeful and aligned with your condition.' },
      { title: 'Modern Equipment', description: 'We use up-to-date electrotherapy devices to ensure accurate application and consistent results throughout your sessions.' },
      { title: 'Patient-Focused Care', description: 'Every treatment plan is built around your goals, whether it’s returning to sport, work, or daily routines.' },
      { title: 'Convenient Location', description: 'Our clinic is easily accessible, making it simple to attend sessions regularly and stay consistent with your treatment plan.' },
      { title: 'Integrated Treatment Approach', description: 'Electrotherapy is combined with movement-based therapy, manual techniques, and education to support overall recovery.' },
    ],
    closingText: 'If you’re looking for electrotherapeutic modalities, Remarkable Physiotherapy is here to support your recovery with evidence-based techniques and modern equipment. Take the first step toward improved movement and function. Book an appointment today.',
  },
  {
    slug: 'vestibular-therapy',
    description: 'If you often feel dizzy, unsteady, or experience spinning sensations, it can interfere with daily activities and reduce confidence in movement. Vestibular therapy is a targeted approach that focuses on restoring balance, reducing dizziness, and improving coordination. At Remarkable Physiotherapy, we provide structured care plans to help individuals return to stable, comfortable movement.',
    howItWorks: [
      { title: 'What Is Vestibular Therapy?', description: 'A form of physiotherapy that focuses on the inner ear system and its connection to balance and spatial awareness. This therapy uses specific exercises and movement strategies to retrain the brain and body to work together more efficiently.' },
      { title: 'Targeted Exercise Programs', description: 'May include eye and head coordination exercises, balance retraining, habituation exercises (to reduce sensitivity to movement), and gaze stabilization techniques.' },
      { title: 'Gradual Progression', description: 'As your condition improves, exercises are adjusted to match your progress, ensuring steady improvement while avoiding unnecessary strain.' },
    ],
    benefits: ['Reduced dizziness and vertigo episodes', 'Improved balance and coordination', 'Increased confidence while walking or moving', 'Better focus and visual stability', 'Lower risk of falls'],
    whoCanBenefit: ['Adults with balance issues as balance declines', 'Individuals recovering from concussion, where dizziness is a common symptom', 'People with inner ear disorders affecting balance'],
    conditionsTreated: ['Vertigo (spinning sensations)', 'Benign Paroxysmal Positional Vertigo (BPPV)', 'Balance disorders', 'Inner ear dysfunction', 'Concussion-related dizziness', 'Motion sensitivity', 'Unsteadiness while walking'],
    treatmentProcess: [
      'Initial Assessment — a detailed evaluation of your symptoms, medical history, and movement patterns to identify the root cause',
      'Guided Exercises — movement and balance testing, a clear explanation of your condition, and guided exercises during the session',
      'Home Program — simple exercises to continue at home; consistency plays a key role in progress',
      'Tips: stay active within your comfort level, follow home exercise routines regularly, avoid sudden head movements if they trigger symptoms, keep track of any changes in symptoms',
    ],
    whyChooseUs: [
      { title: 'Focused Assessment Approach', description: 'We take time to understand your symptoms and how they affect your daily life, creating a plan that matches your needs and goals.' },
      { title: 'One-on-One Care', description: 'Each session is focused on you, ensuring proper supervision, correct exercise techniques, and steady progress.' },
      { title: 'Evidence-Based Methods', description: 'Grounded in proven physiotherapy practices that address the root cause of vestibular issues rather than just managing symptoms.' },
      { title: 'Support Throughout Your Recovery', description: 'We guide you through every stage of your progress, with adjustments made as needed.' },
    ],
    closingText: 'Dizziness and balance issues don’t have to control your daily life. With the right approach, it is possible to regain stability and move with confidence again. Book your appointment today and start your journey to a better balance with vestibular therapy at Remarkable Physiotherapy.',
  },
  {
    slug: 'return-to-work-play',
    description: 'Returning to your daily routine after an injury can feel overwhelming. Whether your goal is getting back to your job, sport, or active lifestyle, having the right support makes a significant difference. At Remarkable Physiotherapy, our return-to-work/play program focuses on helping you rebuild strength, restore movement, and regain confidence so you can step back into your routine safely.',
    howItWorks: [
      { title: 'What Is Return to Work/Play?', description: 'A structured rehabilitation program that bridges the gap between initial treatment and real-life demands — whether that means lifting at work, running on the field, or handling repetitive tasks. It focuses on restoring mobility and strength, improving coordination and endurance, reducing the risk of re-injury, and preparing your body for specific physical demands.' },
      { title: 'Functional Movement Training', description: 'Emphasizes movements that mirror your daily activities, preparing your body for real-world situations.' },
      { title: 'Injury Prevention Focus', description: 'Strong emphasis on correcting movement patterns and building resilience to reduce the chances of future injuries.' },
      { title: 'Gradual Workload Increase', description: 'Ensures a steady increase in physical demand so your body can adapt safely, rather than rushing back too quickly.' },
    ],
    benefits: ['Restored mobility and strength', 'Improved coordination and endurance', 'Reduced risk of re-injury', 'Body prepared for specific physical demands'],
    whoCanBenefit: ['Injured workers preparing for job-specific tasks such as lifting, standing, or repetitive motion', 'Athletes and active individuals regaining performance levels for training or competition', 'Post-surgery patients needing gradual reconditioning back to daily responsibilities'],
    conditionsTreated: ['Muscle and joint injuries', 'Workplace strain injuries', 'Sports-related injuries', 'Post-surgical recovery', 'Repetitive stress conditions'],
    treatmentProcess: [
      'Initial Assessment — movement analysis, strength testing, and discussion about your goals',
      'Goal-Oriented Planning — a structured plan focused on activities that match your real-life demands',
      'Progressive Training — strength-building exercises, functional movement training, balance and coordination drills, work or sport-specific simulations',
      'Ongoing Monitoring — progress is closely tracked and adjustments are made as needed',
    ],
    whyChooseUs: [
      { title: 'Individual Attention', description: 'Every person’s recovery journey is different. Your progress, goals, and comfort are always prioritized.' },
      { title: 'Focus on Real-Life Outcomes', description: 'The program is designed around your actual needs — whether that’s returning to a job site, gym, or sports field.' },
      { title: 'Supportive Environment', description: 'A welcoming and encouraging setting where our team is committed to helping you stay motivated throughout your journey.' },
      { title: 'Evidence-Based Approach', description: 'Each step of the program is grounded in proven methods that support safe and effective recovery.' },
    ],
    closingText: 'If you’re ready to return to work or get back into your sport, the right plan can make all the difference. Book an appointment today to learn more about our return-to-work/play program and start moving toward your goals with confidence.',
  },
  {
    slug: 'myofascial-release',
    description: 'Tight muscles, lingering soreness, and limited movement can affect your daily routine more than you might expect. At Remarkable Physiotherapy, myofascial release is used to address these concerns by focusing on the connective tissue that surrounds and supports your muscles. This approach aims to ease tension, improve mobility, and help you move with greater comfort.',
    howItWorks: [
      { title: 'What Is Myofascial Release?', description: 'A hands-on therapy that targets the fascia — a thin layer of connective tissue that wraps around muscles, joints, and organs. When fascia becomes tight or restricted due to injury, stress, or repetitive strain, it can lead to discomfort and reduced flexibility.' },
      { title: 'How Fascia Affects Your Body', description: 'When healthy, fascia allows smooth, unrestricted movement. When it tightens or develops trigger points, it can create tension that spreads to other areas, which is why discomfort is sometimes felt far from the original source.' },
      { title: 'How It Works', description: 'A physiotherapist applies sustained, gentle pressure to specific areas of the body. This technique helps stretch and loosen the fascia, focusing on slow, controlled movements that encourage lasting change in tissue behaviour.' },
    ],
    benefits: ['Improved mobility', 'Reduced muscle tension', 'Support for injury recovery', 'Better posture', 'Relief from chronic discomfort'],
    whoCanBenefit: ['Suitable for individuals of all activity levels', 'Those who spend long hours at a desk', 'People who engage in physical work or sports'],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Sports-related strain', 'Headaches linked to muscle tightness', 'Postural imbalances', 'Repetitive strain injuries', 'Scar tissue restrictions'],
    treatmentProcess: [
      'Initial Assessment — questions about your symptoms, daily activities, and previous injuries to identify the root cause of your discomfort',
      'Treatment Session — targeted, slow and controlled pressure applied to specific areas while you remain comfortable',
      'After the Session — changes in how your body feels immediately or over the next few days as the body adapts',
    ],
    whyChooseUs: [
      { title: 'Skilled and Attentive Care', description: 'Trained in myofascial release techniques and how to apply them effectively based on each person’s condition.' },
      { title: 'One-on-One Sessions', description: 'Each appointment is focused on you, ensuring your concerns are heard and addressed without distractions.' },
      { title: 'Focus on Root Causes', description: 'Rather than focusing solely on symptoms, the clinic aims to identify and treat the underlying causes of your discomfort.' },
      { title: 'Comfortable Environment', description: 'A calm and welcoming space where you can focus on your recovery and feel at ease during your sessions.' },
      { title: 'Convenient Location', description: 'Located in Markham, easily accessible, making it simple to incorporate care into your routine.' },
    ],
    closingText: 'If you are experiencing muscle tightness, restricted movement, or ongoing discomfort, myofascial release at Remarkable Physiotherapy may help you move more freely and feel more at ease in your daily activities. Contact Remarkable Physiotherapy today to schedule your appointment or speak with the team about your concerns.',
  },
  {
    slug: 'therapeutic-exercise',
    description: 'Therapeutic exercise plays a key role in improving movement, building strength, and supporting recovery from injury or physical strain. At Remarkable Physiotherapy, this service is designed to help individuals regain control over their bodies through structured, goal-focused movement programs.',
    howItWorks: [
      { title: 'What Is Therapeutic Exercise?', description: 'A series of planned physical activities created to improve strength, flexibility, balance, coordination, and endurance. These are carefully selected based on your condition, physical ability, and goals — not random workouts.' },
      { title: 'Targeted Strength Development', description: 'Weak muscles often contribute to joint stress and discomfort. Therapeutic exercise strengthens specific muscle groups that support injured or sensitive areas, improving stability and control.' },
      { title: 'Improved Mobility and Flexibility', description: 'Guided exercises help improve joint mobility and muscle flexibility, making everyday tasks easier and more comfortable.' },
      { title: 'Injury Prevention', description: 'By correcting movement patterns and strengthening key muscle groups, therapeutic exercise reduces the likelihood of future injuries.' },
      { title: 'Posture and Alignment', description: 'Focuses on correcting alignment issues to help you maintain proper posture throughout your day.' },
    ],
    benefits: ['Targeted strength development', 'Improved mobility and flexibility', 'Injury prevention', 'Better posture and alignment'],
    whoCanBenefit: ['Musculoskeletal issues such as back pain, neck stiffness, and joint discomfort', 'Post-surgical recovery, rebuilding strength safely', 'Athletes restoring performance and coordination after sports injuries', 'Chronic conditions such as arthritis or repetitive strain injuries'],
    conditionsTreated: ['Back pain and neck stiffness', 'Joint discomfort', 'Post-surgical deconditioning', 'Sports injuries', 'Arthritis and repetitive strain injuries'],
    treatmentProcess: [
      'Initial Assessment — a detailed assessment evaluating your movement, strength, and limitations',
      'Individual Exercise Plan — a structured program including stretching, strengthening, balance training, and functional movement drills',
      'Guided Practice — performing exercises under supervision to ensure proper form and technique, with adjustments as you progress',
      'Home Program — exercises to perform at home, helping you stay consistent and maintain progress between visits',
    ],
    whyChooseUs: [
      { title: 'Focused One-on-One Attention', description: 'Each session is centred around your progress, with dedicated time and attention to ensure exercises are performed correctly and safely.' },
      { title: 'Structured Progress Tracking', description: 'Your improvement is regularly monitored, and your program is adjusted as needed.' },
      { title: 'Functional Approach', description: 'The focus is not just on isolated movements but on improving how your body performs in daily activities such as walking, lifting, and reaching.' },
      { title: 'Supportive Environment', description: 'A welcoming and encouraging setting where your goals are taken seriously and your progress is valued.' },
    ],
    closingText: 'If you are looking to improve movement, build strength, or recover from injury, therapeutic exercise at Remarkable Physiotherapy can help you take the next step. Book your appointment today to learn more about how this service can help you achieve your goals.',
  },
  {
    slug: 'trigger-point-release',
    description: 'Is muscle tightness and persistent soreness disrupting your daily life or limiting your movement? Trigger point release offers a focused manual therapy approach that targets specific areas of muscle tissue known as trigger points. At Remarkable Physiotherapy in Markham, this targeted technique addresses discomfort at its source, helping you move more smoothly and naturally.',
    howItWorks: [
      { title: 'What Is Trigger Point Release?', description: 'A hands-on therapy that focuses on small, tight knots within muscles. These knots can develop due to overuse, injury, poor posture, or stress. Applying pressure helps relax the muscle fibres, improves circulation, and reduces tension in surrounding tissues — also easing referred discomfort in other parts of the body.' },
      { title: 'Muscle Overuse and Strain', description: 'Repetitive movements from sports, work, or daily habits can overload certain muscles, leading to tight bands forming within the muscle fibres.' },
      { title: 'Poor Posture', description: 'Sitting for long hours, especially with poor alignment, can strain specific muscle groups, often leading to trigger points in the neck, shoulders, and lower back.' },
      { title: 'Stress and Tension', description: 'Emotional stress can cause muscles to remain partially contracted, contributing to the formation of trigger points.' },
      { title: 'Injury or Trauma', description: 'After an injury, muscles may tighten as a protective response. If not addressed, these tight areas can persist and become trigger points.' },
    ],
    benefits: ['Reduced muscle tension', 'Improved mobility', 'Enhanced circulation', 'Support for daily activities'],
    whoCanBenefit: ['People with neck and shoulder tension from posture or stress', 'Athletes with sports-related muscle tightness', 'Anyone with tension headaches or repetitive strain'],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Tension headaches', 'Sports-related muscle tightness', 'Postural strain', 'Repetitive strain issues'],
    treatmentProcess: [
      'Initial Assessment — discussing your symptoms, daily habits, and movement patterns',
      'Targeted Treatment — the physiotherapist locates trigger points by palpating the muscles, then applies steady pressure to release the tension',
      'Movement and Stretching — guided stretches and movements to support lasting changes in muscle function',
      'Aftercare Advice — hydration, gentle exercises, or posture adjustments to help maintain results between sessions',
      'Tips to prevent trigger points: maintain proper posture, stay active, stretch regularly, manage stress',
    ],
    whyChooseUs: [
      { title: 'Individual-Focused Care', description: 'Each session is based on your specific needs, rather than a one-size-fits-all approach.' },
      { title: 'Skilled Physiotherapists', description: 'Trained in manual therapy techniques, including trigger point release, ensuring accurate identification and treatment of muscle knots.' },
      { title: 'Modern Facility', description: 'A clean, comfortable environment where you can focus on your recovery and movement goals.' },
      { title: 'Education and Support', description: 'You gain knowledge about your body, posture, and movement habits to help prevent recurring issues.' },
    ],
    closingText: 'If muscle tightness or persistent discomfort is affecting your routine, trigger point release at Remarkable Physiotherapy in Markham may be the right step forward. Contact Remarkable Physiotherapy today to schedule your appointment or speak with the team about your concerns.',
  },
  {
    slug: 'dancer-rehabilitation',
    description: 'Dancers place unique demands on their bodies, combining strength, flexibility, and precision in every movement. At Remarkable Physiotherapy, our dancer rehabilitation service focuses on helping performers recover from injuries, improve movement patterns, and return to the studio with confidence.',
    howItWorks: [
      { title: 'What Is Dancer Rehabilitation?', description: 'A focused approach to recovery and performance care, specifically designed for individuals involved in dance, considering the technical demands of turnout, pointe work, jumps, and floor transitions — restoring the strength, control, and alignment needed for dance-specific movements, not just addressing discomfort.' },
      { title: 'Detailed Assessment', description: 'A thorough evaluation of your movement patterns, strength, flexibility, and technique, identifying the source of discomfort and contributing factors such as posture or muscle imbalance.' },
      { title: 'Movement-Focused Care', description: 'We look at the entire body rather than just the injured area — for example, ankle discomfort may be influenced by hip strength or core stability.' },
      { title: 'Dance-Specific Exercises', description: 'Exercises that mirror dance movements, rebuilding strength and control that directly translates into your performance.' },
      { title: 'Gradual Return to Dance', description: 'A step-by-step progression so you can safely return to rehearsals and performances.' },
    ],
    benefits: ['Improved strength and control in dance-specific movements', 'Enhanced flexibility without compromising stability', 'Reduced risk of recurring injuries', 'Greater awareness of body alignment and technique', 'Increased confidence when returning to dance'],
    whoCanBenefit: ['Pre-professional and professional dancers requiring focused care to maintain peak physical condition', 'Recreational dancers who experience strain or discomfort', 'Dance students building strong movement habits early'],
    conditionsTreated: ['Overuse injuries (tendon irritation, shin discomfort, stress reactions in bones)', 'Ankle and foot problems (sprains, instability, Achilles tendon conditions)', 'Hip and knee concerns from turnout and deep pliés', 'Lower back strain from extensions and lifts', 'Muscle imbalances affecting technique'],
    treatmentProcess: [
      'A discussion about your dance background and current concerns',
      'A physical assessment of movement, strength, and flexibility',
      'Hands-on techniques to address areas of tension or restriction',
      'A guided exercise program to support your recovery',
      'Advice on modifying training or rehearsals during recovery',
    ],
    whyChooseUs: [
      { title: 'Knowledge of Dance Demands', description: 'We understand the physical requirements of different dance styles and incorporate them into your rehabilitation plan.' },
      { title: 'Individual Attention', description: 'Each dancer receives one-on-one care, ensuring your progress is closely monitored and adjusted as needed.' },
      { title: 'Focus on Movement Quality', description: 'Emphasizes proper movement patterns, helping you perform with greater efficiency and control.' },
      { title: 'Support Beyond Recovery', description: 'We help you build strength and awareness to support your ongoing training.' },
    ],
    closingText: 'If you are dealing with an injury or want to improve your movement as a dancer, Remarkable Physiotherapy is ready to help. Contact us today to schedule your appointment and start your dancer rehabilitation journey.',
  },
];

async function run() {
  await connectDB();
  let updated = 0;
  for (const d of DETAILS) {
    const { slug, ...fields } = d;
    const res = await Service.updateOne({ slug }, { $set: fields });
    if (res.matchedCount) updated++;
    else console.log('No service found for slug:', slug);
  }
  console.log(`Updated detail content for ${updated}/${DETAILS.length} services`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
