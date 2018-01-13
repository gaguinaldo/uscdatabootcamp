import tweepy
import time
import matplotlib.pyplot as plt
import re
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer 
from twitter_keys import Access_Token, Access_Token_Secret, Consumer_Key, Consumer_API_Secret

auth = tweepy.OAuthHandler(Consumer_Key, Consumer_API_Secret)
auth.set_access_token(Access_Token, Access_Token_Secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
api_ = tweepy.API(auth)
main_account_name = '@enveraai'

last_tweet = api.search(main_account_name)

last_tweet_text = last_tweet['statuses'][0]['text'].lower()
last_tweet_id = last_tweet['statuses'][0]['id']
last_tweet_screen_name = last_tweet['statuses'][0]['user']['screen_name']
twitter_search_name = re.findall(r"(@[a-z0-9]+)", last_tweet_text)
last_tweet_analysis = twitter_search_name[1]

tweet_text_list = []
for tweet in tweepy.Cursor(api_.user_timeline, id=last_tweet_analysis).items(1000):
    tweet_text_list.append(tweet.text)
    
compound_score = []
analyzer = SentimentIntensityAnalyzer()
for text_ in tweet_text_list:
    score = analyzer.polarity_scores(text_)['compound']
    compound_score.append(score)
    
plt.figure(figsize = (10, 10))
x = np.arange(1,len(compound_score) + 1)
y = compound_score
plt.plot(x, y, marker = 'o', alpha = 0.5, label = last_tweet_analysis)
plt.xlabel('Tweets Ago', fontsize = 14)
plt.ylabel('Compound Score (unitless)', fontsize = 14)
plt.title('Tweet Sentiment Over Last 1000 Tweets', fontsize = 14)
plt.ylim(-1, 1, 0.25)
plt.legend(title="Tweets")
plt.savefig('./images/tweet_sentiment.png')
plt.show()