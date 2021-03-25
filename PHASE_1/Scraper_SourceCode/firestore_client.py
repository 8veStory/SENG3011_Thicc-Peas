from firebase_admin import credentials, initialize_app, firestore
from datetime import datetime
from typing import List
import hashlib

class FireStore_Client:
    """
    Represents a connection to the Thicc Peas' FireStore DB for CDC disease
    information.

    Lets you:
     * WRITE diseases/articles/reports
     * TODO: READ
     * TODO: DELETE
    
    """
    def __init__(self):
        """
        Connect to FireStore.
        """
        self.cred = credentials.Certificate("./handy-amplifier-307202-7b79308ce4ea.json")
        self.default_app = initialize_app(self.cred)
        self.db = firestore.client()
    
    def write_disease_auto_id(self, name: str, symptoms: List[str]) -> str:
        """
        Same as 'write_disease' except you don't have the disease_id.
        Returns disease_id.
        """
        disease_id = hashlib.md5((name + symptoms).encode("utf-8")).hexdigest()
        self.write_disease(disease_id, name, symptoms)
        return disease_id

    def write_disease(self, disease_id: str, name: str, symptoms: List[str]):
        """
        Writes disease information.
        """
        # Creates a document with a unique ID inside 'diseases' collection.
        disease_ref = self.db.collection(u'diseases').document()

        # Fill out information about the disease.
        disease_ref.set({
            u'disease_id':           disease_id,
            u'name':                 name,
            u'symptoms':             symptoms,
        })

        print(f"Sent disease:\n\tdisease_id: {disease_id}\n\tname: {name}\n\tsymptoms: {symptoms}")

    def write_article_auto_id(self, url: str, headline: str, main_text: str, date_of_publication: datetime) -> str:
        """
        Same as 'write_article' except you don't have the article_id.
        Return the article_id hash.

        NOTE: date_of_publication shoud be of format YYYY-MM-DD
        """
        article_id = hashlib.md5((url + headline + main_text + date_of_publication.__str__()).encode("utf-8")).hexdigest()
        self.write_article(article_id, url, headline, main_text, date_of_publication)
        return article_id

    def write_article(self, article_id: str, url: str, headline: str, main_text: str, date_of_publication: datetime):
        """
        Writes an article to the DB.
        """
        disease_ref = self.db.collection(u'articles').document()

        disease_ref.set({
            u'article_id':          article_id,
            u'url':                 url,
            u'headline':            headline,
            u'main_text':           main_text,
            u'date_of_publication': date_of_publication
        })

        preview_main_text = main_text
        if (main_text is not None):
            preview_main_text = main_text[0:50]
        print(f"Sending article:\n\tarticle_id: {article_id}\n\turl: {url}\n\theadline: {headline}\n\tmain_text: {preview_main_text}\n\tdate_of_publication: {date_of_publication}")

    def write_report_auto_id(self, article_id: str, disease_id: str, location: str, event_date: datetime, reported_cases: int = None, hospitalisations: int = None, deaths: int = None) -> str:
        """
        Same as 'write_report' except you don't have the report_id.

        Returns the report_id hash
        NOTE: date_of_publication shoud be of format YYYY-MM-DD
        """
        strings = [article_id, disease_id, location, str(event_date), str(reported_cases), str(hospitalisations), str(deaths)]
        report_id = hashlib.md5(' '.join(filter(None, strings)).encode('utf-8')).hexdigest()
        self.write_report(report_id, article_id, disease_id, location, event_date, reported_cases, hospitalisations, deaths)
        return report_id

    def write_report(self, report_id: str, article_id: str, disease_id: str, location: str, event_date: datetime, reported_cases: int = None, hospitalisations: int = None, deaths: int = None):
        """
        Writes a report to the DB.
        """
        disease_ref = self.db.collection(u'reports').document()

        disease_ref.set({
            u'report_id':  report_id,
            u'article_id': article_id,
            u'disease_id': disease_id,
            u'event_date': event_date,
            u'location':   location,
            u'statistics': {
                u'reported_cases':   reported_cases,
                u'hospitalisations': hospitalisations,
                u'deaths':           deaths,
            }
        })
        print(f"Sending report:\n\treport_id: {report_id}\n\tarticle_id: {article_id}\n\tdisease_id: {disease_id}\n\tlocation: {location}\n\tevent_date: {event_date}\n\treported_cases: {reported_cases}\n\thospitalisations: {hospitalisations}\n\tdeaths: {deaths}")


if __name__ == "__main__":
    firestore_client = FireStore_Client()

    # Example for Max.
    # article_hash = firestore_client.write_article_auto_id("https://www.cdc.gov/ecoli/2020/o157h7-11-20/index.html", "Outbreak of E. coli Infections – Unknown Source 3", "Final Outbreak Information Illustration of a megaphone. For more information, see Symptoms of E. coli Infection.", datetime.strptime("2000-12-18", "%Y-%m-%d"))
    # firestore_client.write_report_auto_id(article_hash, "44f2a7bb8b2e8a086c4f7d5aa82cd4ff", "US", datetime.strptime("2020-12-18", "%Y-%m-%d"), 18, 6, None)

    # Other Examples
    firestore_client.write_disease("b4d780dd311fae981c01e339f90afdae", "cholera", ["profuse watery diarrhea", "vomiting"])
    firestore_client.write_article_auto_id("https://www.cdc.gov/mmwr/volumes/67/wr/mm6719a6.htm?s_cid=mm6719a6_w", "Notes from the Field: Outbreak of Vibrio cholerae Associated with Attending a Funeral — Chegutu District, Zimbabwe, 2018", "On January 16, 2018, the Zimbabwe Ministry of Health and Child Care (MoHCC) was notified of five adults with watery diarrhea and severe dehydration who were admitted to Chegutu District Hospital, Mashonaland West Province. Three of the five patients died within hours of admission. Vibrio cholerae O1 serotype Ogawa was isolated from the stool sample of one decedent, prompting an investigation. During 2008–2009, Zimbabwe experienced one of the largest and deadliest cholera outbreaks in recent history (98,585 cases and 4,287 [4.3%] deaths), during which Chegutu reported a case fatality rate (CFR) >5% (1,2). During 2012–2016, Zimbabwe reported 93 cholera cases and two deaths nationwide, but the increasing population density and aging water and sanitation infrastructure in Chegutu raised concern about the possibility of another widespread outbreak. MoHCC identified the index patient as a woman aged 79 years who died on January 8 after 2 days of watery diarrhea. Before her death, she sought care at a private clinic, but cholera was not suspected at the time. In accordance with local practice, water was flushed through the woman’s body to cleanse it in preparation for burial; the water was subsequently discarded into the municipal sewer network without further treatment. One person who had been involved in preparation of the body and who served traditional food at the multiday funeral reception at the index patient’s home developed watery diarrhea 2 days after the funeral. Six other funeral attendees, including all three decedents, had reported developing acute watery diarrhea within 6 days of the funeral. Two of the patients who subsequently died had reported assisting with the burial. Within 4 days of the index patient’s funeral, the outbreak had spread to local residents who reported no epidemiologic links to the funeral (Figure). During this time, intermittent interruptions of the chlorinated municipal water supply and low pressure areas might have increased the use of unchlorinated boreholes and shallow wells that are vulnerable to contamination from adjacent, poorly maintained, sewer pipes, including those containing water used to wash the body. Microbiologic testing from a shallow well at the funeral reception location yielded fecal coliform bacteria, suggesting conditions conducive to cholera transmission. Although the index patient had not reported any travel, the epidemiologic investigation revealed that her home was less than a half mile from the site of a separate funeral that had taken place on December 30, 2017. Although that death was not associated with a diarrheal illness, two persons who attended the funeral had traveled 292 miles (470 km) from Lusaka, Zambia, where a cholera outbreak was ongoing (3). These attendees did not report diarrhea and were not tested for asymptomatic carriage of V. cholerae. It is not known how the index patient became infected; however, it is likely that funeral practices employed to prepare her body for burial and unsafe food preparation at the subsequent funeral potentiated the wider geographic distribution of this outbreak. Following a coordinated rapid response effort including surveillance, health promotion, laboratory testing, case management training, and emergency water, sanitation, and hygiene (WASH) activities by MoHCC and international partners, the Zimbabwe outbreak was contained to urban and peri-urban areas of Chegutu. A single suspected case was identified along the major highway from Chegutu to the capital of Harare, 62 miles (100 km) away, but no cases were identified in Harare. As of April 5, 2018, a total of 107 cases, including 51 hospitalizations and four deaths (CFR = 3.8%) had been reported in Zimbabwe; 9% of the cases occurred in children aged <5 years. The last case was reported on February 19. Approximately 60% of the cases occurred in three suburbs: Chegutu township (19; 17%), Pfupajena (31; 29%), and Kaguvi (13; 12%). Of 64 stool specimens tested from January 10 to February 21, nine (14.1%) yielded V. cholerae O1. Antimicrobial susceptibility testing by disk diffusion identified eight isolates with decreased susceptibility to cotrimoxazole, and two with decreased susceptibility to tetracycline. All isolates were susceptible to ciprofloxacin, considered first line therapy for severe cholera in accordance with Zimbabwe national guidelines. In the setting of cholera epidemics, localized outbreaks have been associated with funeral gatherings, including transporting and washing or preparing a body for burial and contamination of shared meals at a funeral (4,5). However, outside of epidemics, cholera outbreaks rarely originate from funeral gatherings (6). Given the increase in regional travel to and from countries experiencing cholera outbreaks and those with endemic cholera transmission (7), the potential for cholera outbreaks should be considered an ever-present risk in areas that lack adequate WASH infrastructure. Early detection and promotion of safe handling of the dead are part of the routine recommendations during a cholera outbreak. This outbreak is a reminder that even in settings where cholera has been absent, public messaging about safe burial and safe food handling need to be provided at all times.", datetime.strptime("2018-05-18", "%Y-%m-%d"))
    firestore_client.write_report_auto_id("0b3dd4d3ea931cf8667025ae7cdc77e7", "b4d780dd311fae981c01e339f90afdae", "Zimbabwe", datetime.strptime("2018-05-18", "%Y-%m-%d"), reported_cases=93, deaths=2)