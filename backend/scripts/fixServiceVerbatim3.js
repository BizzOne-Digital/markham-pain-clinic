// Corrects services where subheaded lists had been condensed/paraphrased. Batch 3 of 5 (final).
require('dotenv').config();
const connectDB = require('../config/db');
const Service = require('../models/Service');

const FIXES = [
  {
    slug: 'psychological-services',
    benefits: [],
    howItWorks: [
      { title: 'Stress, Anxiety, and Depression', description: 'Daily pressures, unexpected life events, or ongoing worries can lead to stress, anxiety, or low mood. Psychological Services help you recognize triggers, manage thoughts, and regain a sense of control.' },
      { title: 'Injury-Related Emotional Challenges', description: 'Recovering from injuries such as motor vehicle accidents or dealing with ongoing physical discomfort can take a toll emotionally. Feelings of frustration, fear, or uncertainty are common. Support in this area focuses on helping you adjust, stay motivated, and maintain a positive outlook during recovery.' },
      { title: 'Workplace Stress and Burnout', description: 'High demands, long hours, or a lack of balance can lead to burnout. Psychological support helps you manage workload pressures, improve focus, and establish healthier routines.' },
      { title: 'Sleep Issues', description: 'Difficulty falling or staying asleep often connects to stress or anxiety. Addressing underlying thoughts and habits can improve sleep patterns and overall energy levels.' },
      { title: 'Relationship and Family Concerns', description: 'Conflicts or communication issues within relationships can affect emotional well-being. Therapy sessions help you understand perspectives, improve communication, and build stronger connections.' },
      { title: 'Coping with Pain and Rehabilitation', description: 'Living with physical discomfort or going through rehabilitation can be mentally exhausting. Psychological Services help you develop coping strategies that support both your emotional well-being and your recovery.' },
    ],
    whoCanBenefit: ['Ongoing stress or anxiety', 'Emotional challenges related to injury', 'Difficulty managing work-life balance', 'Sleep disturbances', 'Relationship concerns', 'Challenges during rehabilitation'],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Consultation', description: 'Your first session involves a discussion about your concerns, history, and current challenges. This helps in forming a clear picture of your needs.' },
      { title: 'Goal Setting', description: 'You and your psychologist will outline realistic and meaningful goals. These may include managing stress levels, improving sleep, or handling specific life situations more effectively.' },
      { title: 'Ongoing Sessions', description: 'Regular sessions focus on applying strategies, reviewing progress, and adjusting approaches as needed. Techniques may include cognitive and behavioural methods, relaxation exercises, and structured discussions.' },
      { title: 'Progress Tracking', description: 'Your progress is monitored to ensure that each session contributes to meaningful changes in your daily life.' },
    ],
  },
  {
    slug: 'mckenzie-method',
    benefits: [],
    whatIsIt: 'The McKenzie method, also known as Mechanical Diagnosis and Therapy (MDT), is a globally recognized system of assessment and treatment focused on identifying the root cause of pain rather than simply addressing symptoms. Widely used for spine-related issues, including lower back and neck concerns, but can also be applied to the extremities, such as the shoulders and knees. This method emphasizes active involvement. Instead of relying solely on passive techniques, you will learn specific movements and positions that can help reduce discomfort and improve mobility. If you are experiencing recurring pain, stiffness, or limited movement, the McKenzie method may be a suitable option. It is particularly helpful if your pain changes with movement or posture, you prefer an active approach, or you want to learn how to manage your condition independently.',
    howItWorks: [
      { title: 'Assessment Process', description: 'Reviewing your health history. Understanding your current symptoms. Observing how your body responds to repeated movements. This step is essential because it helps classify your condition into specific categories. Once identified, a targeted plan is created based on how your body reacts to certain movements.' },
      { title: 'Movement-Based Approach', description: 'Reduce or centralize pain. Improve joint function. Restore normal movement patterns. You’ll also be shown how to perform these movements correctly so you can continue them outside the clinic.' },
      { title: 'Self-Management Focus', description: 'Recognize early signs of discomfort. Apply corrective movements. Maintain progress over time. This reduces the need for frequent visits and puts you in control of your recovery process.' },
      { title: 'Targeted Care Based on Assessment', description: 'Every plan begins with a detailed evaluation, ensuring the approach matches your specific condition rather than a one-size-fits-all approach.' },
      { title: 'Active Participation', description: 'You play an important role in your progress. This active involvement can lead to faster improvements and greater awareness of your body.' },
      { title: 'Reduced Dependence on Ongoing Visits', description: 'Once you learn to manage your condition, you may not need frequent clinic visits, making it a practical option for busy individuals.' },
      { title: 'Focus on Long-Term Control', description: 'By addressing the underlying cause and teaching corrective strategies, this method supports sustained results rather than temporary changes.' },
    ],
    whoCanBenefit: [],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [
      { title: 'Spine-Related Issues', description: 'Lower back pain. Neck stiffness. Disc-related conditions. Sciatica.' },
      { title: 'Joint and Limb Concerns', description: 'Shoulder pain. Knee discomfort. Repetitive strain injuries.' },
    ],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Session', description: 'A comprehensive assessment. Movement testing. Identification of your condition type. Introduction to initial exercises.' },
      { title: 'Follow-Up Sessions', description: 'Monitoring your progress. Adjusting exercises as needed. Ensuring proper technique. Advancing your movement program.' },
    ],
  },
  {
    slug: 'deep-tissue-massage',
    benefits: ['Drink water after your session.', 'Avoid intense physical activity immediately afterward.', 'Stretch gently to maintain flexibility.', 'Communicate openly with your therapist.'],
    whatIsIt: 'Deep tissue massage is a hands-on technique that targets deeper muscle layers using slow, controlled pressure. Unlike lighter forms of massage, this approach works through tension that builds up over time due to stress, repetitive movements, or physical strain. The frequency depends on your lifestyle and level of discomfort. Some individuals benefit from weekly sessions, while others may only need occasional visits to maintain muscle condition.',
    howItWorks: [
      { title: 'Targeting Muscle Layers', description: 'The technique involves gradually applying pressure along muscle fibres. This allows the therapist to reach deeper structures without causing unnecessary discomfort. The goal is to reduce tightness and improve flexibility over time.' },
      { title: 'Improving Circulation', description: 'Applying pressure encourages blood flow to affected areas. This supports tissue repair and helps remove waste products that accumulate in tight muscles.' },
      { title: 'Breaking Down Adhesions', description: 'Adhesions are bands of tight tissue that can form after injury or overuse. These can restrict movement and cause discomfort. Deep tissue massage works to reduce these restrictions and restore mobility.' },
      { title: 'Reduced Muscle Tightness', description: 'This approach helps loosen tight areas that may limit your range of motion or cause discomfort during daily activities.' },
      { title: 'Improved Mobility', description: 'By working through deeper muscle layers, it becomes easier to move without stiffness or restriction.' },
      { title: 'Support for Injury Recovery', description: 'Deep tissue massage can help manage the lingering effects of past injuries by improving tissue condition and flexibility.' },
      { title: 'Stress Reduction', description: 'Although it focuses on deeper pressure, many individuals still find this technique calming and grounding, especially after long periods of physical or mental strain.' },
    ],
    whoCanBenefit: ['Office workers dealing with neck and shoulder tightness', 'Athletes managing muscle fatigue.', 'Individuals with physically demanding jobs', 'People recovering from minor strains', 'Anyone experiencing ongoing muscle discomfort'],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your session begins with a discussion about your concerns, lifestyle, and any areas of discomfort. This helps identify where the massage should be focused.' },
      { title: 'Focused Treatment', description: 'The therapist will apply controlled pressure to specific muscle groups. Communication is encouraged throughout the session to ensure the pressure remains comfortable.' },
      { title: 'After the Session', description: 'It’s common to feel mild soreness afterward, similar to what you might feel after exercise. This typically settles within a day or two. Staying hydrated and moving gently can help ease this process.' },
    ],
  },
  {
    slug: 'soft-tissue-release',
    benefits: [],
    howItWorks: [
      { title: 'Targeting Problem Areas', description: 'During a session, your physiotherapist identifies areas of tightness or restriction. These may include common problem zones such as the neck, shoulders, lower back, or legs. Gentle yet precise pressure is applied to release tension within the tissues.' },
      { title: 'Improving Blood Flow', description: 'By working on restricted muscles and fascia, soft tissue release helps increase blood circulation. Improved circulation supports the body’s natural repair process and helps reduce stiffness.' },
      { title: 'Restoring Movement', description: 'Tight tissues can limit how freely your joints move. This technique helps improve flexibility and range of motion, making everyday movements smoother and more comfortable.' },
      { title: 'Reduced Muscle Tension', description: 'By releasing tight areas, this method helps muscles feel more relaxed and less restricted.' },
      { title: 'Improved Flexibility', description: 'Regular sessions can support better mobility, making it easier to move without stiffness.' },
      { title: 'Enhanced Recovery', description: 'Whether from daily strain or physical activity, soft tissue release supports faster recovery by improving circulation and tissue function.' },
      { title: 'Better Posture', description: 'Addressing muscle imbalances can help improve posture, especially for those who spend long hours sitting or working at a desk.' },
    ],
    whoCanBenefit: ['Office workers experiencing stiffness from prolonged sitting', 'Athletes dealing with muscle fatigue or strain', 'Individuals recovering from minor injuries', 'Anyone looking to improve movement and reduce muscle tightness.'],
    whoCanBenefitDetails: [],
    conditionsTreated: ['Muscle tightness and stiffness', 'Sports-related strains', 'Neck and shoulder tension', 'Lower back discomfort', 'Postural issues from desk work', 'Repetitive strain from work or daily activities'],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'Your first visit to Remarkable Physiotherapy includes a detailed assessment. Your physiotherapist will review your movement, posture, and areas of concern to understand what’s causing your symptoms.' },
      { title: 'Hands-On Treatment', description: 'Once the assessment is complete, soft tissue release techniques are applied to the affected areas. The pressure used is adjusted based on your comfort level and condition.' },
      { title: 'Movement-Based Support', description: 'You may also be guided through simple movements or stretches to support the session’s effects. These can help maintain progress between visits.' },
    ],
  },
  {
    slug: 'relaxation-method',
    benefits: [],
    howItWorks: [
      { title: 'Reducing Muscle Tension', description: 'Tight muscles can restrict movement and create discomfort in areas such as the neck, shoulders, and lower back. Gentle techniques used during sessions help release built-up tension and improve flexibility.' },
      { title: 'Supporting Mental Calmness', description: 'Stress often affects both the body and the mind. Through guided breathing and relaxation techniques, sessions help lower stress levels and encourage a more peaceful state.' },
      { title: 'Improving Sleep Patterns', description: 'When your body is tense and your mind is active, sleep can become disrupted. Relaxation sessions can help your body settle, making it easier to fall asleep and stay asleep.' },
      { title: 'Enhancing Daily Function', description: 'When tension is reduced, simple activities such as walking, sitting, or working become easier and more comfortable. This allows you to move through your day with less strain.' },
    ],
    whoCanBenefit: ['Spend long hours sitting at a desk.', 'Feel constant tightness in your muscles.', 'Experience stress from work or personal life.', 'Have difficulty sleeping.', 'Want to improve your overall sense of calm.'],
    whoCanBenefitDetails: [],
    conditionsTreated: [],
    conditionsTreatedDetails: [],
    treatmentProcess: [],
    treatmentProcessDetails: [
      { title: 'Initial Assessment', description: 'We begin by identifying areas where tension is most noticeable. This may include posture evaluation and movement checks to understand how your body responds to stress.' },
      { title: 'Guided Relaxation Techniques', description: 'During the session, you will be guided through breathing exercises and gentle techniques aimed at easing muscle tightness. The environment is calm and quiet to help you fully settle into the process.' },
      { title: 'Post-Session Advice', description: 'After your session, you may receive simple suggestions such as breathing exercises or posture tips that can be practiced at home to maintain the results.' },
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
  console.log(`Fixed ${updated}/${FIXES.length} services (batch 3)`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
