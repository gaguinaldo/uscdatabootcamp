import pymongo
import scrape_mars


def mongo_store():

    # Import all of the data from the scrape_mars import.
    news_title, news_p = scrape_mars.marsNasaNewsScrape()
    mars_weather = scrape_mars.marsWeatherScrape()
    featured_image_url = scrape_mars.marsImageScrape()
    hemisphere_image_urls = scrape_mars.marsHemiScrape()
    df_table_html = scrape_mars.marsFactsScrape()

    # Connect to mongo on the local host.
    conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)

    # Connect to or create the database within Mongo
    db = client.marsdb

    # Drop collection named marsDataScrape.
    db.marsScrapeData.drop()

    # Create document that will be written into Mongo.
    post = {

        'headline': news_title,
        'teaser': news_p,
        'image': featured_image_url,
        'hemisphere': hemisphere_image_urls,
        'dataHtml': df_table_html
    }

    # Insert documnet into the collection
    db.marsScrapeData.insert_one(post)

    # Convert the output from the Mongo query to a list of dictionaries.
    marsScrapeDataOutput = list(db.marsScrapeData.find())

    # Return the list of dictionaries to the user.
    return marsScrapeDataOutput


# if __name__ == '__main__':
#     mongo_store()
