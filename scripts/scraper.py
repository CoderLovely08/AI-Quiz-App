import requests
from bs4 import BeautifulSoup
import pandas as pd

base_url = "https://www.indiabix.com/aptitude/height-and-distance/0{}001"

start_page = 10  # Starting page ID
end_page = 20    # Ending page ID (inclusive)

all_questions = []

for page_id in range(start_page, end_page + 1):
    url = base_url.format(str(page_id).zfill(2))  # Format the URL with leading zeros
    
    response = requests.get(url, verify=False)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        for question_div in soup.find_all(class_='bix-div-container'):
            question_text = question_div.find(class_='bix-td-qtxt').text.strip()
            options = [option.find(class_='flex-wrap').text for option in question_div.find_all(class_='bix-td-option-val')]
            answer = question_div.find(class_='jq-hdnakq').get('value')

            if len(options) == 4:  # Only consider questions with 4 options
                all_questions.append([question_text] + options + [answer])
    else:
        print(f"Failed to fetch the webpage ({url}). Status code:", response.status_code)

# Create a DataFrame
df = pd.DataFrame(all_questions, columns=['question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'answer'])

# Display the DataFrame
print(df)
