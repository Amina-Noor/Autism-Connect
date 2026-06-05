// ==========================================
// AUTISM SUPPORT RECOMMENDATION ENGINE
// ==========================================

// PRIORITY SCHEDULING ALGORITHM
export const sortActivitiesByPriority = (activities) => {

  const priorityMap = {
    High: 3,
    Medium: 2,
    Low: 1
  };

  return [...activities].sort((a, b) => {

    const priorityDiff =
      priorityMap[b.priority || 'Medium'] -
      priorityMap[a.priority || 'Medium'];

    if (priorityDiff === 0) {
      return a.time.localeCompare(b.time);
    }

    return priorityDiff;
  });
};


// RULE-BASED RECOMMENDATION ALGORITHM
export const getMoodRecommendation = (mood) => {

  const recommendations = {

    happy: {
      emoji: '⭐',
      title: 'Positive Reinforcement',
      text: 'Reward and fun activities are recommended.'
    },

    sad: {
      emoji: '🫁',
      title: 'Calming Support',
      text: 'Breathing exercises and calming support recommended.'
    },

    angry: {
      emoji: '🎵',
      title: 'Relaxation Time',
      text: 'Soft music and quiet time recommended.'
    },

    anxious: {
      emoji: '🧘',
      title: 'Stress Relief',
      text: 'Relaxation and stretching activities recommended.'
    }

  };

  return recommendations[mood] || recommendations.happy;
};