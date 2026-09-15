// Full, non-condensed rewrite for the final 5 services.
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const DETAILS = [
  {
    slug: 'psychological-services',
    description: 'Mental and emotional health play a major role in how you move, think, and live each day. At Remarkable Physiotherapy Psychological Services are available to support individuals facing stress, emotional strain, or challenges linked to injury and recovery. This service is designed to help you build resilience, improve clarity, and move forward with confidence in both your physical and mental well-being.',
    howItWorks: [
      { title: 'What Are Psychological Services?', description: 'Focus on assessing and addressing emotional, behavioural, and cognitive concerns, provided by a trained psychologist who works with you to identify patterns, understand challenges, and develop practical strategies to manage them. Sessions are conducted in a confidential setting where you can speak openly.' },
      { title: 'Stress, Anxiety, and Depression', description: 'Daily pressures, unexpected life events, or ongoing worries can lead to stress, anxiety, or low mood. Psychological Services help you recognize triggers, manage thoughts, and regain a sense of control.' },
      { title: 'Injury-Related Emotional Challenges', description: 'Recovering from injuries such as motor vehicle accidents or dealing with ongoing physical discomfort can take a toll emotionally. Support focuses on helping you adjust, stay motivated, and maintain a positive outlook during recovery.' },
      { title: 'Workplace Stress and Burnout', description: 'High demands, long hours, or a lack of balance can lead to burnout. Psychological support helps you manage workload pressures, improve focus, and establish healthier routines.' },
      { title: 'Sleep Issues', description: 'Difficulty falling or staying asleep often connects to stress or anxiety. Addressing underlying thoughts and habits can improve sleep patterns and overall energy levels.' },
      { title: 'Relationship and Family Concerns', description: 'Conflicts or communication issues within relationships can affect emotional well-being. Sessions help you understand perspectives, improve communication, and build stronger connections.' },
      { title: 'Coping with Pain and Rehabilitation', description: 'Living with physical discomfort or going through rehabilitation can be mentally exhausting. Psychological Services help you develop coping strategies that support both your emotional well-being and your recovery.' },
    ],
    benefits: ['Improved ability to recognize and manage stress triggers', 'Better sleep patterns', 'Improved focus and workplace resilience', 'Stronger coping strategies during rehabilitation'],
    whoCanBenefit: ['Ongoing stress or anxiety', 'Emotional challenges related to injury', 'Difficulty managing work-life balance', 'Sleep disturbances', 'Relationship concerns', 'Challenges during rehabilitation'],
    conditionsTreated: ['Stress, anxiety and depression', 'Injury-related emotional challenges (MVA, chronic pain, recovery stress)', 'Workplace stress and burnout', 'Sleep issues', 'Relationship and family concerns', 'Coping with pain and rehabilitation'],
    treatmentProcess: [
      'Initial Consultation — a discussion about your concerns, history, and current challenges',
      'Goal Setting — outlining realistic and meaningful goals, such as managing stress levels, improving sleep, or handling specific life situations',
      'Ongoing Sessions — applying strategies, reviewing progress, and adjusting approaches, using cognitive and behavioural methods, relaxation exercises, and structured discussions',
      'Progress Tracking — monitored to ensure each session contributes to meaningful changes in your daily life',
    ],
    whyChooseUs: [
      { title: 'Integrated Care Approach', description: 'Physical and mental health are closely connected. Psychological Services work alongside other treatments to create a well-rounded care plan.' },
      { title: 'Confidential and Supportive Environment', description: 'A private space where your concerns are heard without judgment, encouraging open communication and trust.' },
      { title: 'Focus on Practical Outcomes', description: 'Each session is designed to help you apply what you learn in real-life situations, with an emphasis on actionable steps rather than just discussion.' },
      { title: 'Support for Injury Recovery', description: 'If you are undergoing physiotherapy or recovering from an accident, psychological support can play a key role in maintaining motivation and consistency.' },
      { title: 'Convenient Access', description: 'Located in Markham, our clinic makes it easy to access both physical and psychological care under one roof.' },
    ],
    closingText: 'You do not need to wait for a major issue to seek support. Early intervention can help prevent concerns from becoming more complex. If you are looking for Psychological Services in Markham, Remarkable Physiotherapy is here to support your journey toward improved mental and emotional well-being. Book an appointment today or contact our clinic to learn more.',
  },
  {
    slug: 'mckenzie-method',
    description: 'If you are dealing with ongoing back, neck, or joint discomfort, finding the right approach can make a significant difference in how you move and function each day. At Remarkable Physiotherapy, the McKenzie method is used to assess, manage, and improve a wide range of musculoskeletal conditions with a clear, structured system.',
    howItWorks: [
      { title: 'What Is the McKenzie Method?', description: 'Also known as Mechanical Diagnosis and Therapy (MDT), a globally recognized system of assessment and treatment focused on identifying the root cause of pain rather than simply addressing symptoms. Widely used for spine-related issues but can also be applied to the extremities, such as shoulders and knees. Emphasizes active involvement rather than relying solely on passive techniques.' },
      { title: 'Assessment Process', description: 'Reviewing your health history, understanding your current symptoms, and observing how your body responds to repeated movements — classifying your condition into specific categories.' },
      { title: 'Movement-Based Approach', description: 'Emphasizes repeated movements and sustained positions, carefully selected to reduce or centralize pain, improve joint function, and restore normal movement patterns. You’ll be shown how to perform these correctly so you can continue outside the clinic.' },
      { title: 'Self-Management Focus', description: 'Teaches you to manage your condition independently — recognizing early signs of discomfort, applying corrective movements, and maintaining progress over time, reducing the need for frequent visits.' },
    ],
    benefits: ['Targeted care based on detailed assessment', 'Active participation leading to faster improvements', 'Reduced dependence on ongoing visits', 'Focus on long-term control'],
    whoCanBenefit: ['Your pain changes with movement or posture', 'You prefer an active approach', 'You want to learn how to manage your condition independently'],
    conditionsTreated: ['Lower back pain', 'Neck stiffness', 'Disc-related conditions', 'Sciatica', 'Shoulder pain', 'Knee discomfort', 'Repetitive strain injuries'],
    treatmentProcess: [
      'Initial Session — a comprehensive assessment, movement testing, identification of your condition type, and introduction to initial exercises',
      'Follow-Up Sessions — monitoring your progress, adjusting exercises as needed, ensuring proper technique, and advancing your movement program',
      'You will also receive clear instructions to continue your exercises at home',
    ],
    whyChooseUs: [
      { title: 'Individual Attention', description: 'Every session is focused on your specific needs. The assessment process ensures your care plan aligns with how your body responds to movement.' },
      { title: 'Clear Communication', description: 'You’ll always know what’s happening and why, explained in a straightforward way so you feel confident performing exercises on your own.' },
      { title: 'Focus on Education', description: 'You are not just receiving treatment, you are learning how your body works and how to manage discomfort effectively.' },
      { title: 'Convenient Location', description: 'Easily accessible, making it simple to stay consistent with your visits and progress.' },
    ],
    closingText: 'Take charge of your recovery today, reach out to Remarkable Physiotherapy. Book your appointment now to discover how the McKenzie method can accelerate your recovery and help you move confidently every day. Don’t wait, start your journey toward better movement today.',
  },
  {
    slug: 'deep-tissue-massage',
    description: 'If persistent muscle tightness or stiffness is interfering with your daily routine, deep tissue massage can play a key role in restoring movement and easing discomfort. At Remarkable Physiotherapy in Markham, this service focuses on addressing deeper layers of muscle and connective tissue to help you move with greater ease and confidence.',
    howItWorks: [
      { title: 'What Is Deep Tissue Massage?', description: 'A hands-on technique that targets deeper muscle layers using slow, controlled pressure, working through tension that builds up over time due to stress, repetitive movements, or physical strain. Often chosen for chronic muscle tightness, limited mobility, postural strain, recovery after activity, and old injuries.' },
      { title: 'Targeting Muscle Layers', description: 'Gradually applying pressure along muscle fibres allows the therapist to reach deeper structures without causing unnecessary discomfort, reducing tightness and improving flexibility over time.' },
      { title: 'Improving Circulation', description: 'Applying pressure encourages blood flow to affected areas, supporting tissue repair and helping remove waste products that accumulate in tight muscles.' },
      { title: 'Breaking Down Adhesions', description: 'Adhesions are bands of tight tissue that can form after injury or overuse, restricting movement. Deep tissue massage works to reduce these restrictions and restore mobility.' },
    ],
    benefits: ['Reduced muscle tightness', 'Improved mobility', 'Support for injury recovery', 'Stress reduction'],
    whoCanBenefit: ['Office workers dealing with neck and shoulder tightness', 'Athletes managing muscle fatigue', 'Individuals with physically demanding jobs', 'People recovering from minor strains', 'Anyone experiencing ongoing muscle discomfort'],
    conditionsTreated: ['Chronic muscle tightness', 'Limited mobility', 'Postural strain from desk work', 'Old injuries affecting movement'],
    treatmentProcess: [
      'Initial Assessment — a discussion about your concerns, lifestyle, and any areas of discomfort',
      'Focused Treatment — controlled pressure applied to specific muscle groups, with communication encouraged throughout to ensure comfort',
      'After the Session — mild soreness is common, similar to after exercise, settling within a day or two; staying hydrated and moving gently can help',
      'Tips: drink water after your session, avoid intense physical activity immediately afterward, stretch gently to maintain flexibility, communicate openly with your therapist',
    ],
    whyChooseUs: [
      { title: 'Individual-Focused Care', description: 'Every session is based on your specific needs, rather than a one-size-fits-all routine.' },
      { title: 'Skilled Hands-On Approach', description: 'Precise techniques address deeper muscle layers while keeping your comfort in mind throughout the session.' },
      { title: 'Calm and Professional Environment', description: 'A welcoming space where you can relax while receiving focused care for your concerns.' },
      { title: 'Integrated Support', description: 'Deep tissue massage can be combined with other physiotherapy services for a more complete approach to improving movement and function.' },
    ],
    closingText: 'If muscle tightness or limited movement is impacting your daily life, now is the time to take action. Book your deep tissue massage at Remarkable Physiotherapy in Markham today and experience the difference in how you move and feel.',
  },
  {
    slug: 'soft-tissue-release',
    description: 'Soft tissue release is a hands-on technique used to address tight muscles, restricted movement, and discomfort caused by everyday strain, sports activity, or prolonged sitting. At Remarkable Physiotherapy, this approach helps improve movement, ease tension, and support recovery, so you can return to your routine with greater comfort and confidence.',
    howItWorks: [
      { title: 'What Is Soft Tissue Release?', description: 'Focuses on muscles, ligaments, and fascia, the connective tissues that support your body. Over time these can become tight or restricted due to injury, repetitive motion, or poor posture, leading to stiffness, reduced mobility, and ongoing discomfort. Targeted pressure and stretching techniques break down restrictions, improve circulation, and restore natural movement patterns.' },
      { title: 'Targeting Problem Areas', description: 'Your physiotherapist identifies areas of tightness or restriction — common zones such as the neck, shoulders, lower back, or legs — and applies gentle yet precise pressure to release tension.' },
      { title: 'Improving Blood Flow', description: 'Working on restricted muscles and fascia increases blood circulation, supporting the body’s natural repair process and helping reduce stiffness.' },
      { title: 'Restoring Movement', description: 'Improves flexibility and range of motion, making everyday movements smoother and more comfortable.' },
    ],
    benefits: ['Reduced muscle tension', 'Improved flexibility', 'Enhanced recovery', 'Better posture'],
    whoCanBenefit: ['Office workers experiencing stiffness from prolonged sitting', 'Athletes dealing with muscle fatigue or strain', 'Individuals recovering from minor injuries', 'Anyone looking to improve movement and reduce muscle tightness'],
    conditionsTreated: ['Muscle tightness and stiffness', 'Sports-related strains', 'Neck and shoulder tension', 'Lower back discomfort', 'Postural issues from desk work', 'Repetitive strain from work or daily activities'],
    treatmentProcess: [
      'Initial Assessment — reviewing your movement, posture, and areas of concern to understand what’s causing your symptoms',
      'Hands-On Treatment — soft tissue release techniques applied to the affected areas, with pressure adjusted to your comfort level',
      'Movement-Based Support — simple movements or stretches to support the session’s effects and maintain progress between visits',
    ],
    whyChooseUs: [
      { title: 'Skilled and Attentive Care', description: 'Every session is focused on your individual condition and goals, taking time to assess your needs and apply the right techniques.' },
      { title: 'Focus on Movement and Function', description: 'Emphasizes restoring natural movement patterns rather than just addressing symptoms.' },
      { title: 'Comfortable Environment', description: 'A calm and welcoming setting where your comfort is a priority, with attention to your feedback and tolerance.' },
      { title: 'Consistent Support', description: 'Progress is monitored over time, and adjustments are made as needed to align with your recovery and activity goals.' },
    ],
    closingText: 'If you’re dealing with muscle tightness, restricted movement, or ongoing discomfort, soft tissue release at Remarkable Physiotherapy can help you move more freely and feel more at ease in your daily activities. Contact Remarkable Physiotherapy today to schedule your appointment or speak with the team about how this service can support your needs.',
  },
  {
    slug: 'relaxation-method',
    description: 'Finding time to unwind has become increasingly difficult in a fast-paced city. Ongoing stress, physical tension, and mental fatigue can gradually affect how your body feels and performs. At Remarkable Physiotherapy, our relaxation method focuses on calming both the body and mind through structured techniques that support comfort, mobility, and overall well-being.',
    howItWorks: [
      { title: 'What Is the Relaxation Method?', description: 'A structured approach that uses gentle techniques to ease muscle tension, regulate breathing, and promote a calmer state of mind. Can include controlled breathing, light manual techniques, guided muscle release, and posture awareness, designed to reduce physical strain while encouraging mental calmness.' },
      { title: 'Reducing Muscle Tension', description: 'Gentle techniques help release built-up tension in areas such as the neck, shoulders, and lower back, improving flexibility.' },
      { title: 'Supporting Mental Calmness', description: 'Guided breathing and relaxation techniques help lower stress levels and encourage a more peaceful state.' },
      { title: 'Improving Sleep Patterns', description: 'When your body is tense and your mind is active, sleep can become disrupted. Sessions help your body settle, making it easier to fall asleep and stay asleep.' },
      { title: 'Enhancing Daily Function', description: 'When tension is reduced, simple activities such as walking, sitting, or working become easier and more comfortable.' },
    ],
    benefits: ['Reduced muscle tension', 'Supported mental calmness', 'Improved sleep patterns', 'Easier daily function'],
    whoCanBenefit: ['You spend long hours sitting at a desk', 'You feel constant tightness in your muscles', 'You experience stress from work or personal life', 'You have difficulty sleeping', 'You want to improve your overall sense of calm'],
    conditionsTreated: ['Muscle tension from stress', 'Sleep disruption', 'General fatigue and mental strain'],
    treatmentProcess: [
      'Initial Assessment — identifying areas where tension is most noticeable, including posture evaluation and movement checks',
      'Guided Relaxation Techniques — breathing exercises and gentle techniques aimed at easing muscle tightness, in a calm and quiet environment',
      'Post-Session Advice — breathing exercises or posture tips to practice at home to maintain the results',
    ],
    whyChooseUs: [
      { title: 'Focused Attention', description: 'Each session is planned based on your current condition and comfort level, ensuring care that aligns with your goals.' },
      { title: 'Calm and Supportive Environment', description: 'Our clinic is designed to help you relax from the moment you arrive.' },
      { title: 'Practical Techniques You Can Use Daily', description: 'We emphasize simple techniques you can continue outside the clinic to help maintain progress between visits.' },
      { title: 'Convenient Location', description: 'Easily accessible, making it simple to include sessions in your routine without added stress.' },
    ],
    closingText: 'If you are feeling the effects of stress or muscle tension, the relaxation method at Remarkable Physiotherapy can help you reset and recharge. Take the next step toward a calmer and more comfortable daily routine. Book your appointment today to learn more about how this service can fit into your schedule.',
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
