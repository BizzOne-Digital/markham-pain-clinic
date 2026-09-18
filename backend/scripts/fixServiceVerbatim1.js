// Corrects services where subheaded lists had been condensed/paraphrased
// into short summary phrases instead of kept verbatim. Batch 1 of 8.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const FIXES = [
  {
    slug: 'physiotherapy',
    benefits: [],
    howItWorks: [
      { title: 'Improved Mobility', description: 'You’ll notice improved joint and muscle movement, making everyday activities easier.' },
      { title: 'Increased Strength', description: 'Targeted exercises help build muscle strength, which supports joints and prevents future issues.' },
      { title: 'Reduced Risk of Re-Injury', description: 'By correcting movement patterns and strengthening weak areas, Physiotherapy helps lower the chances of recurring problems.' },
      { title: 'Better Posture and Alignment', description: 'Guidance on posture and body mechanics can improve your sitting, standing, and movement throughout the day.' },
      { title: 'For Office Workers', description: 'Address posture-related strain and stiffness caused by prolonged sitting.' },
      { title: 'For Active Individuals', description: 'Improve performance, flexibility, and recovery after physical activity.' },
      { title: 'For Older Adults', description: 'Maintain mobility, balance, and strength for everyday independence.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [
      { title: 'Musculoskeletal Issues', description: 'Back and neck discomfort. Shoulder, knee, and hip concerns. Muscle strains and ligament sprains.' },
      { title: 'Injury Recovery', description: 'Sports-related injuries. Workplace injuries. Post-accident rehabilitation.' },
      { title: 'Post-Surgical Rehabilitation', description: 'Joint replacement recovery. Ligament repair recovery. Mobility restoration after procedures.' },
      { title: 'Chronic Conditions', description: 'Arthritis-related stiffness. Ongoing joint or muscle discomfort. Reduced mobility due to aging or inactivity.' },
    ],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Assessment and Planning', description: 'Based on your evaluation, a structured plan is created to address your specific needs. This plan focuses on restoring movement, improving strength, and preventing further issues.' },
      { title: 'Hands-On Techniques', description: 'Manual therapy may be used to improve joint mobility, reduce stiffness, and support muscle function. These techniques are applied carefully based on your condition.' },
      { title: 'Exercise and Movement Training', description: 'You’ll be guided through exercises designed to improve flexibility, strength, and coordination. These movements are also shared so you can continue them at home, helping maintain progress between sessions.' },
      { title: 'Progress Tracking', description: 'Your progress is regularly monitored, and adjustments are made as your body responds to treatment. This ensures steady progress toward your goals.' },
    ],
  },
  {
    slug: 'chiropractic-care',
    benefits: [],
    howItWorks: [
      { title: 'Improved Mobility', description: 'By restoring joint movement, Chiropractic Care can help you move more freely during daily activities.' },
      { title: 'Reduced Muscle Tension', description: 'Tight muscles often develop as a response to joint restrictions. Addressing the root issue can help ease this tension.' },
      { title: 'Better Posture', description: 'With many people spending long hours sitting, posture-related strain is common. Chiropractic Care can help correct imbalances caused by prolonged sitting or poor ergonomics.' },
      { title: 'Support for Active Lifestyles', description: 'Whether you are active in sports or simply want to stay mobile, Chiropractic Care can help keep your body functioning efficiently.' },
      { title: 'Office Workers', description: 'Long hours at a desk can lead to stiffness in the neck, shoulders, and lower back. Chiropractic Care can help counteract the effects of prolonged sitting.' },
      { title: 'Athletes and Active Individuals', description: 'Repetitive movements and physical strain can lead to joint restrictions. Regular care can help maintain flexibility and reduce the risk of injury.' },
      { title: 'Everyday Movement', description: 'Even routine activities like lifting, walking, or driving can place stress on the body. Chiropractic Care supports smoother, more efficient movement in daily life.' },
    ],
    whoCanBenefit: ['Experience ongoing stiffness or discomfort.', 'Notice reduced range of motion.', 'Spend long hours sitting or working at a desk.', 'Feel tension in your neck, back, or shoulders.', 'Want to maintain mobility and function.'],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Back discomfort and stiffness', 'Neck pain and reduced mobility', 'Headaches related to tension', 'Shoulder and upper back tightness', 'Joint discomfort in the hips or knees', 'Postural strain from desk work'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'We take time to evaluate your posture, joint movement, and overall physical condition. This step helps identify the root cause of your discomfort rather than focusing only on symptoms.' },
      { title: 'Hands-On Care', description: 'Spinal adjustments. Joint mobilization. Soft tissue work. Stretching techniques. Each session is focused on improving how your body moves and responds to daily demands.' },
      { title: 'Ongoing Support', description: 'You may also receive simple exercises or posture tips to support your progress between visits. These can help maintain improvements and reduce the chances of recurring issues.' },
    ],
  },
  {
    slug: 'massage-therapy',
    benefits: ['Staying active with light movement or stretching.', 'Maintaining proper posture during work.', 'Drinking enough water after sessions.', 'Avoiding overexertion immediately after treatment.'],
    howItWorks: [
      { title: 'Deep Tissue Massage', description: 'This method targets deeper layers of muscle and connective tissue. It is often used for chronic tension and areas with persistent tightness.' },
      { title: 'Relaxation Massage', description: 'A gentler approach that focuses on calming the body and easing general stress. It is ideal for those looking to unwind.' },
      { title: 'Sports Massage', description: 'Designed for active individuals, this technique helps prepare muscles before activity and supports recovery afterward.' },
      { title: 'Therapeutic Massage', description: 'A focused approach aimed at specific areas of discomfort or restricted movement, often combined with other physiotherapy methods.' },
      { title: 'Hot Stone Massage', description: 'This technique uses smooth, heated stones placed on specific areas of the body. The warmth helps loosen tight muscles, allowing deeper pressure to be applied more comfortably. It can also support circulation and create a deeply calming effect during the session.' },
    ],
    whoCanBenefit: ['Persistent tightness that does not go away with rest.', 'Limited range of motion in certain areas.', 'Frequent muscle soreness after activity.', 'Increased stress levels affect your body.'],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Neck and shoulder tension.', 'Lower back discomfort.', 'Muscle soreness from workouts.', 'Postural strain from desk work.', 'Headaches linked to muscle tightness.', 'Joint stiffness affects movement.'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your session begins with a brief discussion about your concerns, daily routine, and any areas of discomfort. This helps determine the right approach.' },
      { title: 'Treatment Session', description: 'The therapist applies techniques suited to your condition, adjusting pressure and focus areas throughout the session to ensure comfort.' },
      { title: 'Post-Session Advice', description: 'After the session, you may receive simple suggestions such as stretches or posture adjustments to maintain results between visits.' },
    ],
  },
  {
    slug: 'acupuncture',
    benefits: ['Improved circulation', 'Reduced muscle tightness', 'Enhanced nerve function', 'Support for the body’s natural recovery processes'],
    howItWorks: [
      { title: 'Integrated Care Approach', description: 'Manual therapy helps ease muscle tightness. Exercise programs can improve movement quality. Rehabilitation plans promote recovery.' },
      { title: 'Is Acupuncture Safe?', description: 'When performed by trained professionals, acupuncture is considered a safe procedure. Single-use, sterile needles are always used. Proper hygiene protocols are followed. Treatments are adapted to your comfort level. If you have concerns or medical conditions, these are discussed before starting any session.' },
      { title: 'How Many Sessions Will You Need?', description: 'The number of sessions varies depending on your condition, its duration, and how your body responds. Acute issues may require fewer sessions. Long-standing concerns may need ongoing care. Progress is regularly reviewed and adjusted.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [
      { title: 'Musculoskeletal Concerns', description: 'Neck and back discomfort. Shoulder stiffness. Knee and joint issues. Muscle strains and tension.' },
      { title: 'Sports-Related Concerns', description: 'Overuse injuries. Muscle fatigue. Recovery after intense activity.' },
      { title: 'Stress and Tension', description: 'Headaches and migraines. Jaw tightness. General tension linked to daily stress.' },
      { title: 'Chronic Conditions', description: 'Long-standing discomfort. Nerve-related sensations such as tingling. Reduced Mobility over time.' },
    ],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your first visit includes a detailed discussion about your symptoms, lifestyle, and physical condition. This helps determine the most appropriate points to target.' },
      { title: 'The Treatment Process', description: 'Fine, sterile needles are gently placed in specific areas. Most people feel minimal sensation during insertion. Needles are typically left in place for 15–30 minutes.' },
      { title: 'After the Session', description: 'You may notice changes such as reduced tension, improved Mobility, or a sense of relaxation. Some individuals experience gradual changes over multiple sessions.' },
    ],
  },
  {
    slug: 'manual-therapy',
    benefits: [],
    whatIsIt: 'Manual therapy is a hands-on approach used by physiotherapists to assess and treat muscles, joints, and soft tissues. It involves skilled movements such as joint mobilization, soft-tissue work, stretching, and manipulation techniques to improve movement and reduce discomfort. Manual therapy is suitable for individuals of all activity levels, from office workers to athletes. If you are experiencing stiffness, reduced range of motion, or ongoing discomfort, this approach may help restore balance and function. It is also a useful option for those recovering from injuries or dealing with repetitive strain caused by daily activities.',
    howItWorks: [
      { title: 'Joint Mobilization', description: 'This technique involves gentle, controlled movements applied to joints to increase their range of motion. It is commonly used for stiff joints in areas like the neck, back, shoulders, and knees.' },
      { title: 'Soft Tissue Techniques', description: 'Soft tissue work targets muscles, ligaments, and fascia. By applying pressure and movement, this method helps release tight areas, improve circulation, and restore tissue function.' },
      { title: 'Stretching and Muscle Release', description: 'Guided stretching and muscle release techniques help reduce tightness and improve flexibility. These methods are particularly useful for individuals experiencing muscle imbalances or postural issues.' },
      { title: 'Improved Mobility', description: 'By addressing joint and soft tissue restrictions, manual therapy helps restore natural movement. This makes everyday activities easier and more comfortable.' },
      { title: 'Reduced Muscle Tension', description: 'Targeted techniques help release tight muscles, allowing them to function more efficiently and reducing strain on surrounding areas.' },
      { title: 'Enhanced Circulation', description: 'Hands-on techniques stimulate blood flow, which supports tissue recovery and overall function.' },
      { title: 'Faster Recovery', description: 'When used as part of a physiotherapy plan, manual therapy can help speed up recovery from injuries by improving movement and reducing physical stress on affected areas.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Neck and back discomfort', 'Shoulder injuries', 'Sports-related strains', 'Joint stiffness', 'Postural issues', 'Muscle tightness', 'Workplace-related strain injuries'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'This includes a discussion about your symptoms, medical history, and daily activities. Physical tests may be performed to assess strength, flexibility, and joint function.' },
      { title: 'Hands-On Treatment', description: 'Based on the findings, the physiotherapist will apply appropriate manual therapy techniques to target specific areas. Each session is adjusted according to your progress and comfort level.' },
      { title: 'Movement and Exercise Support', description: 'You may also be guided through exercises to support the effects of manual therapy. These movements help maintain progress between sessions and improve overall function.' },
    ],
  },
  {
    slug: 'cupping-therapy',
    benefits: ['Increase circulation in the treated area.', 'Support muscle relaxation.', 'Reduce tension in tight or overused muscles.', 'Encourage movement of stagnant fluids.'],
    whatIsIt: 'Cupping therapy is a hands-on technique that uses suction cups placed on the skin to create a gentle vacuum effect. This helps stimulate blood flow, ease muscle tightness, and support the body’s natural recovery process. Cupping therapy may be suitable for a wide range of individuals, from office workers to athletes. However, it may not be appropriate for certain conditions, such as skin infections, open wounds, or specific medical concerns.',
    howItWorks: [
      { title: 'Improved Circulation', description: 'The suction effect helps bring blood to the surface, which can support tissue health and recovery.' },
      { title: 'Reduced Muscle Tension', description: 'Cupping therapy can help loosen tight muscles, making it easier to move and perform daily activities.' },
      { title: 'Enhanced Mobility', description: 'By addressing stiffness and restrictions, cupping therapy may help improve the range of motion.' },
      { title: 'Relaxation Effect', description: 'Many individuals report a calming sensation during and after treatment, which can contribute to overall physical comfort.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [
      { title: 'Muscle Tightness and Stiffness', description: 'Cupping therapy is often used to address areas where muscles feel tight or restricted. It can be particularly useful for the back, shoulders, and neck.' },
      { title: 'Sports-Related Strain', description: 'Athletes and active individuals in Markham often use cupping therapy to support recovery after intense physical activity. It may help reduce muscle soreness and improve flexibility.' },
      { title: 'Postural Discomfort', description: 'Long hours at a desk or repetitive movements can lead to postural issues. Cupping therapy may assist in easing tension caused by poor posture.' },
      { title: 'Chronic Aches', description: 'For individuals dealing with ongoing discomfort, cupping therapy can be integrated into a broader physiotherapy plan to support mobility and daily function.' },
    ],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your session at Remarkable Physiotherapy begins with a detailed assessment. This helps determine whether cupping therapy is suitable for your condition and how it should be applied.' },
      { title: 'Application of Cups', description: 'Specialized cups are placed on specific areas of your body. A suction effect is created either through a pump or a heat method. The cups may remain stationary or be gently moved across the skin, depending on the technique used.' },
      { title: 'Duration and Sensation', description: 'A typical session lasts between 10 and 20 minutes. You may feel a pulling sensation, but it should not be painful. After the session, circular marks may appear on the skin. These are temporary and usually fade within a few days.' },
    ],
  },
  {
    slug: 'dry-needling',
    benefits: ['Reduce muscle tightness', 'Improve blood flow to the affected area.', 'Support natural tissue repair.', 'Restore range of motion.'],
    whatIsIt: 'Dry needling is a technique that uses thin, sterile needles inserted into specific points within muscles, often referred to as trigger points, where muscle fibres have become tight or irritated, leading to discomfort, stiffness, or restricted motion. Dry needling may be suitable if you are experiencing muscle tightness, restricted motion, or recurring discomfort linked to trigger points. However, it is not appropriate for everyone. A proper assessment is necessary to determine whether it fits your needs.',
    howItWorks: [
      { title: 'The Role of Trigger Points', description: 'Trigger points can develop due to overuse, injury, poor posture, or repetitive strain. These tight areas can cause discomfort not only at the site but also in surrounding regions. Dry needling targets these points directly to reduce their impact.' },
      { title: 'What You May Feel During Treatment', description: 'During a session, you may feel a slight twitch or brief sensation when the needle reaches the trigger point. This is a normal response and often indicates that the muscle is reacting. After treatment, some soreness may occur for a short period, similar to what you might feel after physical activity.' },
      { title: 'Dry Needling for Active Individuals', description: 'For those involved in sports or regular physical activity, muscle strain and tightness can affect performance. Dry needling can help maintain muscle balance and support movement efficiency, allowing you to stay active with fewer interruptions.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Neck and shoulder tension', 'Back discomfort', 'Sports-related strain', 'Repetitive movement injuries', 'Headaches linked to muscle tightness', 'Hip or leg stiffness'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your first visit includes a detailed assessment of your movement, posture, and muscle condition. This helps determine whether dry needling is appropriate for your situation.' },
      { title: 'A Structured Treatment Plan', description: 'Based on your assessment, a plan may include dry needling and other techniques. The focus is on improving function and reducing the factors contributing to your symptoms.' },
      { title: 'Ongoing Support', description: 'Progress is monitored over time, and adjustments are made as needed. You may also receive exercises or strategies to follow between visits to support your recovery.' },
    ],
  },
  {
    slug: 'spinal-manipulation-adjustment',
    benefits: [],
    howItWorks: [
      { title: 'Post-Injury Support', description: 'Spinal manipulation/adjustment may also be helpful after: sports-related incidents, workplace strain, minor accidents. It supports recovery by encouraging proper movement and reducing strain on affected areas.' },
      { title: 'Improved Mobility', description: 'Restoring joint motion allows you to move more freely during everyday tasks and physical activities.' },
      { title: 'Reduced Muscle Tension', description: 'By addressing joint restrictions, surrounding muscles can relax and function more naturally.' },
      { title: 'Better Posture', description: 'Improved spinal alignment can support healthier posture, especially for those who sit for long hours.' },
      { title: 'Support for Active Lifestyles', description: 'Whether you are active in sports or simply want to stay mobile, this approach helps keep your body functioning efficiently.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Back discomfort', 'Neck stiffness', 'Headaches related to tension', 'Poor posture', 'Limited range of motion', 'Muscle tightness'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Review your medical history. Assess posture and movement. Identify areas of restriction.' },
      { title: 'Treatment Session', description: 'You will be positioned comfortably. Gentle, controlled movements will be applied to specific joints. You may hear a small popping sound, which is a normal part of joint movement. Most sessions are quick and focused, with attention given to your comfort throughout.' },
      { title: 'After the Session', description: 'Following spinal manipulation/adjustment, many people notice improved movement, reduced stiffness, and a sense of ease in affected areas. Your therapist may also suggest exercises or posture tips to maintain results between visits.' },
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
  console.log(`Fixed ${updated}/${FIXES.length} services (batch 1)`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
