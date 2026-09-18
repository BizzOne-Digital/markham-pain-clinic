// Corrects services where subheaded lists had been condensed/paraphrased. Batch 2 of 7.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const FIXES = [
  {
    slug: 'electrotherapeutic-modalities',
    benefits: ['Reducing muscle tension', 'Improving blood flow', 'Supporting tissue repair', 'Enhancing muscle activation', 'Decreasing inflammation', 'Non-invasive and safe', 'Can be combined with exercise and manual techniques', 'Helps activate muscles that are difficult to engage', 'Supports faster return to daily activities', 'Suitable for a wide range of age groups'],
    howItWorks: [
      { title: 'Transcutaneous Electrical Nerve Stimulation (TENS)', description: 'Helps reduce discomfort by interrupting signals sent to the brain' },
      { title: 'Electrical Muscle Stimulation (EMS)', description: 'Activates muscles to improve strength and function' },
      { title: 'Interferential Current Therapy (IFC)', description: 'Targets deeper tissues for improved circulation and reduced swelling' },
      { title: 'Ultrasound Therapy', description: 'Uses sound waves to promote tissue repair' },
      { title: 'Laser Therapy', description: 'Encourages cellular activity and tissue regeneration' },
    ],
    whoCanBenefit: ['Have ongoing muscle or joint discomfort.', 'Are you recovering from an injury or surgery?', 'Experience reduced muscle strength or activation.', 'Want to improve mobility and function.'],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Back and neck discomfort', 'Sports-related injuries', 'Joint conditions such as arthritis', 'Muscle strains and ligament sprains', 'Post-surgical rehabilitation', 'Nerve-related conditions like sciatica'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'During Treatment', description: 'Electrodes or applicators are placed on the skin. You may feel a mild tingling or pulsing sensation. Sessions typically last between 10 and 30 minutes. The intensity is adjusted for comfort and effectiveness.' },
    ],
  },
  {
    slug: 'vestibular-therapy',
    benefits: ['Reduced dizziness and vertigo episodes', 'Improved balance and coordination', 'Increased confidence while walking or moving', 'Better focus and visual stability', 'Lower risk of falls'],
    howItWorks: [
      { title: 'What to Expect During Your Visits', description: 'A detailed discussion about your symptoms. Movement and balance testing. A clear explanation of your condition. Guided exercises during the session. Simple exercises to continue at home. Consistency plays a key role in progress, so following your plan between sessions is important.' },
      { title: 'Tips to Support Your Progress', description: 'Staying active within your comfort level. Following home exercise routines regularly. Avoiding sudden head movements if they trigger symptoms. Keeping track of any changes in symptoms.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [
      { title: 'Adults with Balance Issues', description: 'As balance declines, even simple activities can feel challenging. Vestibular therapy helps restore stability and improve mobility.' },
      { title: 'Individuals Recovering from Concussion', description: 'Dizziness is a common symptom after a head injury. Therapy can help restore normal movement and reduce discomfort.' },
      { title: 'People with Inner Ear Disorders', description: 'Conditions affecting the inner ear often disrupt balance. Targeted exercises help the body adapt and regain control.' },
    ],
    conditionsTreated: ['Vertigo (spinning sensations)', 'Benign Paroxysmal Positional Vertigo (BPPV)', 'Balance disorders', 'Inner ear dysfunction', 'Concussion-related dizziness', 'Motion sensitivity', 'Unsteadiness while walking'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your first visit to Remarkable Physiotherapy includes a detailed evaluation of your symptoms, medical history, and movement patterns. This helps identify the root cause of your dizziness or balance concerns.' },
      { title: 'Targeted Exercise Programs', description: 'Eye and head coordination exercises. Balance retraining. Habituation exercises (to reduce sensitivity to movement). Gaze stabilization techniques. These exercises aim to retrain the brain to adapt to changes in the vestibular system.' },
      { title: 'Gradual Progression', description: 'As your condition improves, exercises are adjusted to match your progress. This ensures steady improvement while avoiding unnecessary strain.' },
    ],
  },
  {
    slug: 'return-to-work-play',
    benefits: ['Restoring mobility and strength', 'Improving coordination and endurance', 'Reducing the risk of re-injury', 'Preparing your body for specific physical demands'],
    howItWorks: [
      { title: 'Functional Movement Training', description: 'Instead of isolated exercises, the program emphasizes movements that mirror your daily activities. This prepares your body for real-world situations.' },
      { title: 'Injury Prevention Focus', description: 'A strong emphasis is placed on correcting movement patterns and building resilience. This helps reduce the chances of future injuries.' },
      { title: 'Gradual Workload Increase', description: 'Rushing back too quickly can cause setbacks. The program ensures a steady increase in physical demand, allowing your body to adapt safely.' },
      { title: 'Guided Exercise Sessions', description: 'You’ll perform targeted exercises under supervision to ensure proper technique and steady improvement.' },
      { title: 'Education on Movement and Recovery', description: 'Learning how your body moves and how to protect it during activity is an important part of the process.' },
      { title: 'Gradual Return to Activity', description: 'As you progress, you’ll begin integrating more complex and demanding tasks that reflect your daily life or sport.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [
      { title: 'Injured Workers', description: 'If you’ve experienced a workplace injury, returning too soon without proper conditioning can lead to setbacks. This program prepares your body for job-specific tasks such as lifting, standing, or repetitive motion.' },
      { title: 'Athletes and Active Individuals', description: 'For those involved in sports or physical activities, return to work/play helps you regain performance levels and safely return to training or competition.' },
      { title: 'Post-Surgery Patients', description: 'After surgery, your body needs gradual reconditioning. This program supports a smooth transition back to daily responsibilities and recreational activities.' },
    ],
    conditionsTreated: ['Muscle and joint injuries', 'Workplace strain injuries', 'Sports-related injuries', 'Post-surgical recovery', 'Repetitive stress conditions'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your journey begins with a detailed evaluation of your current condition. This includes movement analysis, strength testing, and a discussion about your goals—whether that’s returning to a physically demanding job or resuming a sport.' },
      { title: 'Goal-Oriented Planning', description: 'Based on your assessment, a structured plan is created. The focus is on activities that match your real-life demands, ensuring every session has purpose and direction.' },
      { title: 'Progressive Training', description: 'Strength-building exercises. Functional movement training. Balance and coordination drills. Work or sport-specific simulations.' },
      { title: 'Ongoing Monitoring', description: 'Your progress is closely tracked, and adjustments are made as needed. This ensures that you continue moving forward without unnecessary strain.' },
    ],
  },
  {
    slug: 'myofascial-release',
    benefits: [],
    whatIsIt: 'Myofascial release is a hands-on therapy that targets the fascia — a thin layer of connective tissue that wraps around muscles, joints, and organs. When fascia becomes tight or restricted due to injury, stress, or repetitive strain, it can lead to discomfort and reduced flexibility. This therapy is suitable for individuals of all activity levels. Whether you spend long hours at a desk, engage in physical work, or participate in sports, myofascial release can be adapted to your needs.',
    howItWorks: [
      { title: 'How Myofascial Release Works', description: 'During a session, a physiotherapist applies sustained, gentle pressure to specific areas of the body. This technique helps stretch and loosen the fascia, allowing it to return to a more natural state. Unlike quick or forceful methods, myofascial release focuses on slow, controlled movements that encourage lasting change in tissue behaviour.' },
      { title: 'Improved Mobility', description: 'Tight fascia can restrict movement and make simple tasks feel challenging. By releasing these restrictions, this therapy can help increase your range of motion and support smoother movement patterns.' },
      { title: 'Reduced Muscle Tension', description: 'Persistent muscle tightness often stems from fascial restrictions. Myofascial release helps ease this tension, allowing muscles to function more freely.' },
      { title: 'Support for Injury Recovery', description: 'After an injury, scar tissue and stiffness can develop, limiting progress. This therapy helps address those restrictions, supporting a more efficient recovery process.' },
      { title: 'Better Posture', description: 'Poor posture often results from imbalances in muscle and fascia. By addressing these issues, myofascial release can help your body align more naturally, reducing strain on joints and muscles.' },
      { title: 'Relief from Chronic Discomfort', description: 'For individuals dealing with long-standing discomfort, this approach may help reduce ongoing tension patterns that contribute to daily strain.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Sports-related strain', 'Headaches linked to muscle tightness', 'Postural imbalances', 'Repetitive strain injuries', 'Scar tissue restrictions'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'The physiotherapist will ask about your symptoms, daily activities, and any previous injuries. This helps identify the root cause of your discomfort rather than just focusing on surface-level symptoms.' },
      { title: 'Treatment Session', description: 'During the session, you will remain comfortable while the therapist applies targeted pressure to specific areas. The pace is slow and controlled, allowing the tissue to respond naturally.' },
      { title: 'After the Session', description: 'You may notice changes in how your body feels immediately or over the next few days. Some individuals experience improved movement, while others feel a gradual reduction in tension as the body adapts.' },
    ],
  },
  {
    slug: 'therapeutic-exercise',
    benefits: [],
    howItWorks: [
      { title: 'Targeted Strength Development', description: 'Weak muscles often contribute to joint stress and discomfort. Therapeutic exercise helps strengthen specific muscle groups that support injured or sensitive areas, improving stability and control.' },
      { title: 'Improved Mobility and Flexibility', description: 'Limited movement can impact daily life. Guided exercises help improve joint mobility and muscle flexibility, making everyday tasks easier and more comfortable.' },
      { title: 'Injury Prevention', description: 'By correcting movement patterns and strengthening key muscle groups, therapeutic exercise reduces the likelihood of future injuries. It helps your body adapt to physical demands more effectively.' },
      { title: 'Posture and Alignment', description: 'Poor posture can lead to ongoing discomfort and strain. Therapeutic exercise focuses on correcting alignment issues to help you maintain proper posture throughout your day.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [
      { title: 'Musculoskeletal Issues', description: 'Conditions such as back pain, neck stiffness, and joint discomfort often respond well to targeted exercise programs that improve strength and mobility.' },
      { title: 'Post-Surgical Recovery', description: 'After surgery, structured movement is essential for regaining function. Therapeutic exercise supports gradual recovery and helps rebuild strength safely.' },
      { title: 'Sports Injuries', description: 'Athletes can benefit from exercise programs that restore performance, improve coordination, and prepare the body for return to activity.' },
      { title: 'Chronic Conditions', description: 'Ongoing issues such as arthritis or repetitive strain injuries can be managed with consistent, guided movement to maintain function and reduce flare-ups.' },
    ],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your journey begins with a detailed assessment that evaluates your movement, strength, and limitations. This helps create a clear picture of your needs.' },
      { title: 'Individual Exercise Plan', description: 'Based on your assessment, a structured program is developed that aligns with your goals. Exercises may include stretching, strengthening, balance training, and functional movement drills.' },
      { title: 'Guided Practice', description: 'During your sessions, you will perform exercises under supervision to ensure proper form and technique. Adjustments are made as you progress.' },
      { title: 'Home Program', description: 'You will also receive exercises to perform at home, helping you stay consistent and maintain progress between visits.' },
    ],
  },
  {
    slug: 'trigger-point-release',
    benefits: [],
    howItWorks: [
      { title: 'Muscle Overuse and Strain', description: 'Repetitive movements, whether from sports, work, or daily habits, can overload certain muscles. Over time, this leads to tight bands forming within the muscle fibres.' },
      { title: 'Poor Posture', description: 'Sitting for long hours, especially with poor alignment, can strain specific muscle groups. This often leads to trigger points in the neck, shoulders, and lower back.' },
      { title: 'Stress and Tension', description: 'Emotional stress can cause muscles to remain partially contracted. This ongoing tension may contribute to the formation of trigger points.' },
      { title: 'Injury or Trauma', description: 'After an injury, muscles may tighten as a protective response. If not addressed, these tight areas can persist and become trigger points.' },
      { title: 'Reduced Muscle Tension', description: 'Applying sustained pressure helps the muscle relax, allowing it to return to a more natural state.' },
      { title: 'Improved Mobility', description: 'When tight knots are addressed, joints and muscles can move more freely. This is particularly helpful for those experiencing stiffness.' },
      { title: 'Enhanced Circulation', description: 'The technique promotes blood flow to the affected area, supporting tissue recovery and function.' },
      { title: 'Support for Daily Activities', description: 'Whether it’s sitting comfortably, exercising, or performing routine tasks, reducing muscle tightness can make movement easier and more efficient.' },
      { title: 'Maintain Proper Posture', description: 'Keep your spine aligned while sitting and standing. Adjust your workstation if needed.' },
      { title: 'Stay Active', description: 'Regular movement helps prevent muscles from becoming stiff and tight.' },
      { title: 'Stretch Regularly', description: 'Incorporating basic stretches into your routine can keep muscles flexible.' },
      { title: 'Manage Stress', description: 'Relaxation techniques such as deep breathing or light activity can help reduce muscle tension linked to stress.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Tension headaches', 'Sports-related muscle tightness', 'Postural strain', 'Repetitive strain issues'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your visit to Remarkable Physiotherapy begins with a detailed assessment. This includes discussing your symptoms, daily habits, and movement patterns.' },
      { title: 'Targeted Treatment', description: 'The physiotherapist will locate trigger points by palpating the muscles. Once identified, steady pressure is applied to release the tension. You may feel mild discomfort during this process, but it is usually manageable and short-lived.' },
      { title: 'Movement and Stretching', description: 'In addition to manual work, guided stretches and movements may be included to support lasting changes in muscle function.' },
      { title: 'Aftercare Advice', description: 'You may receive suggestions such as hydration, gentle exercises, or posture adjustments to help maintain the results between sessions.' },
    ],
  },
  {
    slug: 'dancer-rehabilitation',
    benefits: ['Improved strength and control in dance-specific movements', 'Enhanced flexibility without compromising stability', 'Reduced risk of recurring injuries', 'Greater awareness of body alignment and technique', 'Increased confidence when returning to dance'],
    howItWorks: [
      { title: 'What to Expect During Your Visit', description: 'A discussion about your dance background and current concerns. A physical assessment of movement, strength, and flexibility. Hands-on techniques to address areas of tension or restriction. A guided exercise program to support your recovery. Advice on modifying training or rehearsals during recovery.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [
      { title: 'Pre-Professional and Professional Dancers', description: 'Those who train or perform at a high level often require focused care to maintain peak physical condition.' },
      { title: 'Recreational Dancers', description: 'Even casual dancers can experience strain or discomfort and benefit from structured rehabilitation.' },
      { title: 'Dance Students', description: 'Young dancers in training can develop strong movement habits early, reducing the risk of future injuries.' },
    ],
    conditionsTreated: [],
    conditionsTreatedDetails: [
      { title: 'Overuse Injuries', description: 'Repeated movements can lead to issues such as tendon irritation, shin discomfort, or stress reactions in bones.' },
      { title: 'Ankle and Foot Problems', description: 'Sprains, instability, and conditions affecting the arch or Achilles tendon are common due to frequent jumping and landing.' },
      { title: 'Hip and Knee Concerns', description: 'Turnout and deep pliés can place stress on the hips and knees, leading to strain or imbalance.' },
      { title: 'Lower Back Strain', description: 'Extensions and lifts may contribute to discomfort in the lower back if not supported by proper core strength.' },
      { title: 'Muscle Imbalances', description: 'Uneven strength or flexibility can affect technique and increase the risk of injury.' },
    ],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Detailed Assessment', description: 'We begin with a thorough evaluation of your movement patterns, strength, flexibility, and technique. This helps identify not only the source of discomfort but also contributing factors such as posture or muscle imbalance.' },
      { title: 'Movement-Focused Care', description: 'Rather than focusing solely on the injured area, we look at the entire body. For example, ankle discomfort may be influenced by hip strength or core stability. Addressing these connections helps create more efficient movement.' },
      { title: 'Dance-Specific Exercises', description: 'Your program includes exercises that mirror dance movements. This allows you to rebuild strength and control that directly translates into your performance.' },
      { title: 'Gradual Return to Dance', description: 'Returning to full activity too quickly can increase the chance of re-injury. We guide you through a step-by-step progression so you can safely return to rehearsals and performances.' },
    ],
  },
];

async function run() {
  await connectDB();
  let updated = 0;
  for (const f of FIXES) {
    const { slug, ...fields } = f;
    const res = await Service.updateOne({ slug }, { $set: fields });
    if (res.matchedCount) updated++;
    else console.log('No service found for slug:', slug);
  }
  console.log(`Fixed ${updated}/${FIXES.length} services (batch 2)`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
