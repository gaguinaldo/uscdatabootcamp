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
last_tweet_accounts = ['@southwestair', '@united']

###################
# 	Possible errors occur when there are no tweets for the account.
# 	Error is 'IndexError: list index out of range'
# 	If errors occur at the start, the code should restart from the beginning after waiting for 5 min.

last_tweet = api.search('@enveraai')

last_tweet_text = last_tweet['statuses'][0]['text'].lower()
last_tweet_id = last_tweet['statuses'][0]['id']
last_tweet_screen_name = last_tweet['statuses'][0]['user']['screen_name']
twitter_search_name = re.findall(r"(@[a-z0-9]+)", last_tweet_text)
last_tweet_analysis = twitter_search_name[1]
###################

def extract_tweets(last_tweet_analysis):
	tweet_text_list = []
	for tweet in tweepy.Cursor(api_.user_timeline, id=last_tweet_analysis).items(1000):
		tweet_text_list.append(tweet.text)
	return tweet_text_list

def analyze_tweets(tweet_text_list):
	compound_score = []
	analyzer = SentimentIntensityAnalyzer()
	for text_ in tweet_text_list:
		score = analyzer.polarity_scores(text_)['compound']
		compound_score.append(score)
	return compound_score

def plotr(compound_score):
	fig = plt.figure(figsize = (10, 10))
	x = np.arange(1,len(compound_score) + 1)
	y = compound_score
	plt.plot(x, y, marker = 'o', alpha = 0.5, label = last_tweet_analysis)
	plt.xlabel('Tweets Ago', fontsize = 14)
	plt.ylabel('Compound Score (unitless)', fontsize = 14)
	plt.title('Tweet Sentiment Over Last 1000 Tweets', fontsize = 14)
	plt.ylim(-1, 1, 0.25)
	plt.legend(title="Tweets")
	plt.savefig('./images/tweet_sentiment.png')
	return fig

def reply_with_image(last_tweet_id, last_tweet_screen_name):
	status_text = 'Thanks for the tweet ' + '@' + last_tweet_screen_name + ' heres the analysis of ' + twitter_search_name[1]

	reply_tweet = api.update_with_media('./images/tweet_sentiment.png', status = status_text, in_reply_to_status_id = last_tweet_id)

	return reply_tweet

def reply_in_error(last_tweet_id, last_tweet_screen_name):
	status_text_error = 'Thanks for the tweet ' + '@' + last_tweet_screen_name + ' but I cannot analyze ' + twitter_search_name[1] + ' since it was already selected.  Choose another account.'

	reply_tweet_error = api.update_status(status = status_text_error, in_reply_to_status_id = last_tweet_id)

	return reply_tweet_error

def reply_in_rate_error(last_tweet_id, last_tweet_screen_name):
	status_text_rate_error = 'Thanks for the tweet ' + '@' + last_tweet_screen_name + ' but I cannot analyze ' + twitter_search_name[1] + ' since I hit the rate limit.  Please retry in 60 min.'

	reply_tweet_rate_error = api.update_status(status = status_text_rate_error, in_reply_to_status_id = last_tweet_id)

	return reply_tweet_rate_error


###################
# 	Possible errors include tweeting the same message twice.  
# 	Error is "tweepy.error.TweepError"
#	If the error occurs the code should not reply and restart.

if last_tweet_analysis in last_tweet_accounts:
	print('If branch')
	print(last_tweet_analysis)
	print(last_tweet_accounts)
	#reply_tweet_error = reply_in_error(last_tweet_id, last_tweet_screen_name)

###################

###################
#	Possible error include hitting the rate limit.  Error is "tweepy.error.RateLimitError"
#	If the rate limit error occurs the code should send out tweet to retry in 60 min.
# 		Run this code: reply_tweet_rate_error = reply_in_rate_error(last_tweet_id, last_tweet_screen_name)
# 	Current bug includes having the code clearing the list 'last_tweet_accounts' so the code
# 	always send out the graphs to the user regardless if the account was aleady analyzed. 

else:
	last_tweet_accounts.append(last_tweet_analysis)
	tweet_list = extract_tweets(last_tweet_analysis)
	compound_score = analyze_tweets(tweet_list)
	fig = plotr(compound_score)
	#reply_tweet = reply_with_image(last_tweet_id, last_tweet_screen_name)
	print('Else branch')
	print(last_tweet_analysis)
	print(last_tweet_accounts)

###################