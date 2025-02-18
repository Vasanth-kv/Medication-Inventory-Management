// src/newsData.js
const newsAPIs = {
    all_news: [
      'https://api.fda.gov/drug/event.json',
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.who.int/rss-feeds/news-english.xml',
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.nih.gov/news-events/news-releases/rss.xml'
    ],
    consumer: [
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.nlm.nih.gov/rss/medlineplus/healthtopics.xml'
    ],
    pro: [
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.who.int/rss-feeds/news-english.xml'
    ],
    new_drugs: [
      'https://api.fda.gov/drug/label.json'
    ],
    pipeline: [
      'https://www.clinicaltrials.gov/api/query/study_fields?expr=heart+attack&fields=NCTId,Condition&fmt=json'
    ],
    clinical_trials: [
      'https://api.rss2json.com/v1/api.json?rss_url=https://www.clinicaltrials.gov/ct2/results/rss.xml?cond=cancer'
    ],
    fda_alerts: [
      'https://api.fda.gov/food/enforcement.json'
    ]
  };
  
  // Function to fetch data from a given category
  export const fetchNews = async (category) => {
    if (!newsAPIs[category]) {
      throw new Error(`Invalid category: ${category}`);
    }
  
    try {
      const responses = await Promise.all(newsAPIs[category].map(url => fetch(url).then(res => res.json())));
      return responses;
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      return [];
    }
  };
  