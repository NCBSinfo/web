var def_ncbs_iisc_week = ["07:15", "08:50", "11:30", "14:00", "16:15", "18:00", "18:30", "20:30", "22:00", "23:00"];
var def_ncbs_iisc_sunday = ["08:00", "10:00", "12:00", "14:00", "16:15", "17:45", "19:00", "19:30", "22:00", "23:30"];
var def_iisc_ncbs_week = ["08:15", "09:30", "12:30", "15:15", "17:00", "18:30", "19:30", "21:30", "22:30", "00:00"];
var def_iisc_ncbs_sunday = ["09:00", "11:00", "12:30", "15:15", "17:00", "18:30", "20:00", "21:30", "22:30", "00:30"];
var def_ncbs_mandara_week = ["08:00", "09:00", "17:45", "20:30", "22:00", "23:00", "00:30", "01:30"];
var def_ncbs_mandara_sunday = ["09:00", "10:30", "20:30", "22:00", "23:00", "02:00"];
var def_mandara_ncbs_week = ["07:30", "08:30", "09:30", "18:05", "21:30", "22:30", "23:30", "01:00"];
var def_mandara_ncbs_sunday = ["08:30", "09:30", "18:00", "21:30", "22:30", "00:00"];
var def_ncbs_icts_week = ["08:00", "09:00", "10:00", "13:00", "14:15", "15:15", "16:30", "17:40", "19:00", "20:00", "21:30", "00:05"];
var def_ncbs_icts_sunday = ["08:30", "10:30", "12:30", "15:00", "17:00", "19:00", "21:00", "23:00", "00:05"];
var def_icts_ncbs_week = ["07:45", "09:00", "12:15", "13:30", "14:10", "15:30", "17:00", "17:40", "19:00", "20:30", "22:30"];
var def_icts_ncbs_sunday = ["07:30", "09:30", "11:30", "14:00", "16:00", "18:00", "20:00", "22:00"];
var def_ncbs_cbl = ["00:00", "01:00", "02:00", "03:00", "04:00", "20:30", "21:30", "22:00", "23:00"];
var def_buggy_from_ncbs = ["07:45", "08:30", "09:00", "09:30", "10:30", "11:15", "13:00", "14:00", "15:00", "16:00", "18:00", "18:30", "19:00", "20:00"];
var def_buggy_from_mandara = ["08:00", "08:45", "09:15", "09:45", "10:45", "11:30", "13:45", "14:30", "15:30", "16:15", "18:15", "18:45", "19:15", "20:15"];


var impContacts = [
    ["Emergency", "Reception", "Helpdesk", "080-2366-6666"],

    ["NCBS Reception 1", "Reception", "Helpdesk", "080-2366-6001"],

    ["NCBS Reception 2", "Reception", "Helpdesk", "080-2366-6002"],

    ["Medical Centre", "medical", "Emergency", "080-2366-6450"],

    ["Substation", "substation", "Emergency", "080-2366-6425"],

    ["NCBS Reception 3", "Reception", "Helpdesk", "080-2366-6018"]];


var pinnedContacts = [

    ["Accounts", "accountshelp@ncbs.res.in", "Purushottam.V.Surya Rao", "080-2366-6326"],

    ["Admin", "adminhelp@ncbs.res.in", " S. Ashok Rao", "080-2366-6332"],

    ["Air Conditioning", "achelp@ncbs.res.in", "H S Venkatramana", "080-2366-6426"],

    ["Civil and Architecture", "civilint@ncbs.res.in", "Civil Head", "080-2366-6354"],

    ["Canteen", "canteen@ncbs.res.in", "N/A", "080-2366-6436"],

    ["Electrical", "elechelp@ncbs.res.in", "Suresh Kumar", "080-2366-6425"],

    ["Hospitality", "hospitality@ncbs.res.in", "Shaju Varghese", "080-2366-6095"],

    ["Housing", "housing@ncbs.res.in", "N/A", "080-2366-6004"],

    ["Instrumentation", "ins@ncbs.res.in", "P C Gautam", "080-2366-6052"],

    ["IT Services", "ithelp@ncbs.res.in", "Prasanta Kumar", "080-2366-6420"],

    ["Lab Kitchen", "labkitchen@ncbs.res.in", "P P Ranjith", "080-2366-6670"],

    ["Mechanical", "mechworkshop@ncbs.res.in", "S.Devakumar", "080-2366-6422"],

    ["Purchase", "purchasehelp@ncbs.res.in", "K.Venkata Ramanathan", "080-2366-6345"],

    ["Security", "security@ncbs.res.in", "Shaju Varghese", "080-2366-6003"],

    ["Sports", "sports@ncbs.res.in", "J.Baba Saheb", "080-2366-6099"],

    ["Transport", "transport@ncbs.res.in", "Ashok Rao", "080-2366-6001"],

    ["Electronic Workshop", "elecworkshop@ncbs.res.in", "Mr. A.Dorababu", "080-2366-6046"]

];


var allcontacts = [["Satyajit Mayor", "NCBS Director", "Director&#039;s Office", "080-2366-6301"],

    ["Upinder S Bhalla", "NCBS Dean", "Dean&#039;s Office", "080-2366-6403"],

    ["Upinder S Bhalla", "NCBS Dean", "Dean&#039;s Office", "080-2366-6372"],

    ["Akash Gulyani", "Assistant Investigator", "Principal Investigator", "080-2366-6744"],

    ["Apurva Sarin", "Senior Professor &amp; Dean", "Principal Investigator", "080-2366-6080"],

    ["Sowdhamini R", "Professor H", "Principal Investigator", "080-2366-6250"],

    ["Sumantra Chattarji", "Professor H", "Principal Investigator", "080-2366-6120"],

    ["Mukund Thattai", "Reader F", "Principal Investigator", "080-2366-6222"],

    ["Archana Puroshotham", "Senior Fellow", "Principal Investigator", "080-2366-6558"],

    ["Ashok Venkitaraman", "Collaborative Science Chair", "Principal Investigator", "080-2366-6611"],

    ["Aswin Sai Narain Seshasayee", "Fellow E", "Principal Investigator", "080-2366-6502"],

    ["Axel Brockmann", "Reader F", "Principal Investigator", "080-2366-6512"],

    ["Colin Jamora", "Assistant Investigator", "Principal Investigator", "080-2366-6759"],

    ["Satyajit Mayor", "Senior Professor &#039;I&#039;", "Principal Investigator", "080-2366-6302"],

    ["Satyajit Mayor", "Senior Professor &#039;I&#039;", "Principal Investigator", "080-2366-6300"],

    ["Dasaradhi Palakodeti", "Senior Fellow", "Principal Investigator", "080-2366-6743"],

    ["Upinder S Bhalla", "Professor H", "Principal Investigator", "080-2366-6130"],

    ["Deepa Agashe", "Fellow E", "Principal Investigator", "080-2366-6524"],

    ["Gaiti Hasan", "Senior Professor I", "Principal Investigator", "080-2366-6140"],

    ["Jayant B. Udgaonkar", "Senior Professor I", "Principal Investigator", "080-2366-6150"],

    ["John Mercer", "Investigator", "Principal Investigator", "080-2366-6606"],

    ["Jyotsna Dhawan", "[Visiting] Senior Professor", "Principal Investigator", "080-2366-6016"],

    ["Kenichi Suzuki", "Associate Investigator", "Principal Investigator", "080-2366-6611"],

    ["Krushnamegh Kunte", "Reader F", "Principal Investigator", "080-2366-6085"],

    ["Mahesh Sankaran", "Associate Professor G", "Principal Investigator", "080-2366-6220"],

    ["Mathew MK", "Professor H", "Principal Investigator", "080-2366-6170"],

    ["Praveen Kumar Vemula", "Senior Fellow", "Principal Investigator", "080-2366-6395"],

    ["Raghu Padinjat", "Associate Professor G", "Principal Investigator", "080-2366-6102"],

    ["Ramanuj Dasgupta", "[Visiting] Assistant Investigator", "Principal Investigator", "080-2366-6765"],

    ["Ramkumar Sambasivan", "Senior Fellow", "Principal Investigator", "080-2366-6765"],

    ["Ravi S Muddashetty", "Senior Fellow", "Principal Investigator", "080-2366-6744"],

    ["S. Ramaswamy", "Senior Professor, Dean &amp; CEO", "Principal Investigator", "080-2366-5204"],

    ["Sandeep Krishna", "Associate Professor G", "Principal Investigator", "080-2366-6226"],

    ["Sanjay P Sane", "Associate Professor G", "Principal Investigator", "080-2366-6020"],

    ["Shachi S. Gosavi", "Reader F", "Principal Investigator", "080-2366-6106"],

    ["Shivaprasad P.V.", "Reader F", "Principal Investigator", "080-2366-6511"],

    ["Shravanthi Rampalli Deshpande", "Assistant Investigator", "Principal Investigator", "080-2366-6716"],

    ["Srikala Raghavan", "Assistant Investigator", "Principal Investigator", "080-2366-6743"],

    ["Sudhir Krishna", "Professor H", "Principal Investigator", "080-2366-6070"],

    ["Taslimarif Saiyed", "Director &amp; COO", "Principal Investigator", "080-2366-5100"],

    ["Uma Ramakrishnan", "Reader F", "Principal Investigator", "080-2366-6030"],

    ["Vatsala Thirumalai", "Reader F", "Principal Investigator", "080-2366-6101"],

    ["H.R. Uma", "Assistant Account Officer", "Accounts Department", "080-2366-6384"],

    ["Purushottam V. Suryarao", "Accounts Officer &#039;D&#039;", "Accounts Department", "080-2366-6322"],

    ["Sujatha N.", "Clerk &#039;B&#039;", "Accounts Department", "080-2366-6323"],

    ["Thanuja S.", "Clerk &#039;A&#039;", "Accounts Department", "080-2366-6323"],

    ["K P Pandian", "Head Administration &amp; Finance", "Administration &amp; Finance", "080-2366-6310"],

    ["Wg Cdr (Retd) K F James", "General Manager", "Administration &amp; Finance", "080-2366-5051"],

    ["A. Anand Raj", "Cook &#039;E&#039;", "Administration &amp; Services", "080-2366-6451"],

    ["C. Prashantha Murthy", "Supervisor &#039;C&#039; (Canteen)", "Administration &amp; Services", "080-2366-6438"],

    ["Seetharam", "Cook &#039;E&#039;", "Administration &amp; Services", "080-2366-6451"],

    ["Basavaraj Jalihal", "Junior Engineer &#039;C&#039;", "Air Condition Dept.", "080-2366-6429"],

    ["H.S Venkatramana", "Engineer &#039;E&#039; (Head ES&amp;M)", "Air Condition Dept.", "080-2366-6389"],

    ["G.H. Mohan", "Scientific Officer &#039;E&#039;", "Animal Care Facility", "080-2366-6432"],

    ["Poornima U B", "Scientific Officer &#039;F&#039; Architect", "Architect Department", "080-2366-6360"],

    ["Savitha K S", "Architect &#039;B&#039;", "Architect Department", "080-2366-6355"],

    ["H. Krishnamurthy", "Scientific Officer &#039;F&#039;", "CIFF", "080-2366-6013"],

    ["Shreyas M. Burji", "Assistant Business Development Manager", "CIFF &amp; Microscopy", "080-2366-5055"],

    ["H M Basavaraj", "Engineer &#039;B&#039;", "Civil Department", "080-2366-6352"],

    ["Natarajan.T", "Junior Engineer &#039;D&#039;", "Civil Department", "080-2366-6354"],

    ["P.V. Narayana Rao", "Engineer &#039;E&#039;", "Civil Department", "080-2366-6380"],

    ["Rakshith Komalan H K", "Junior Engineer &#039;B&#039;", "Civil Department", "080-2366-6353"],

    ["K.S. Vishalakshi", "Admin Assistant &#039;C&#039;", "Dean&#039;s Office", "080-2366-6404"],

    ["N. N. Shanthakumary", "Admn. Officer &#039;D&#039;(Academic)", "Dean&#039;s Office", "080-2366-6403"],

    ["Anand Kumar V.", "Engineer &#039;C&#039;", "Electrical Department", "080-2366-6380"],

    ["Ananda Prakash M", "Junior Engineer &#039;C&#039;", "Electrical Department", "080-2366-6383"],

    ["Mohandas D", "Junior Engineer &#039;B&#039;", "Electrical Department", "080-2366-6388"],

    ["Praveen R.G", "Junior Engineer &#039;B&#039;", "Electrical Department", "080-2366-6386"],

    ["Ravindra Munshi", "Engineer &#039;F&#039;", "Electrical Department", "080-2366-6380"],

    ["Sidharath Sekhar Swain", "Junior Engineer &#039;C&#039;", "Electrical Department", "080-2366-6428"],

    ["Suresh Kumar A", "Engineer &#039;D&#039;", "Electrical Department", "080-2366-6430"],

    ["Deepti Trivedi Vyas", "Drosophila Technology Scientist", "Fly Facility", "080-2366-6418"],

    ["G. Aswatha Narayana", "Scientific Assistant &#039;D&#039;", "Fly Facility", "080-2366-6423"],

    ["Vikas Kumar", "Technology Manager", "Fly Facility", "080-2366-6499"],

    ["P. Babu", "Associate Director", "Glycomics and Glycoproteomics Unit", "080-2366-5104"],

    ["Jayaprakash R.", "Junior Engineer &#039;B&#039;", "Instrumentation Dept.", "080-2366-6052"],

    ["P C Gautam", "Scientific Officer &#039;E&#039;", "Instrumentation Dept.", "080-2366-6066"],

    ["Chakrapani", "Junior Engineer", "IT Services", "080-2366-6920"],

    ["Prasanta Kumar Baruah", "Engineer &#039;D&#039;", "IT Services", "080-2366-6421"],

    ["Rajshekar K.S.", "Engineer &#039;C&#039;", "IT Services", "080-2366-6919"],

    ["Ranjith P.P.", "Scientific Asst. &#039;E&#039;", "Lab Support", "080-2366-6065"],

    ["Avinash D. Chinchure", "Scientific Officer &#039;E&#039;", "Library", "080-2366-6025"],

    ["Umashashi S.", "Scientific Assistant &#039;D&#039;", "Library", "080-2366-6026"],

    ["Kannan R.", "Technology Manager", "Mass Spectrometry Facility", "080-2366-5104"],

    ["Dev Kumar S", "Tradesman &#039;C&#039;", "Mechanical Workshop", "080-2366-6422"],

    ["Munuiaswamy Neerathilingam", "Facility Director - PTC Facility", "Protein Technology Core", "080-2366-5101"],

    ["K. Venkata Ramanathan", "Head Purchase &amp; Stores", "Purchase Department", "080-2366-6342"],

    ["Lakshmi Priya P", "Clerk &#039;B&#039;", "Purchase Department", "080-2366-6345"],

    ["Nirmala K.S.", "Clerk &#039;B&#039;", "Purchase Department", "080-2366-6343"],

    ["Sreenath B.A", "Purchase Officer", "Purchase Department", "080-2366-6327"],

    ["Prashanth K.", "Admin Assistant &#039;B&#039;", "Stores Department", "080-2366-6423"],

    ["R. N. Nagaraj", "Sr. Clerk &#039;C&#039;", "Stores Department", "080-2366-6424"],

    ["Vinod Kumar V.", "Clerk &#039;A&#039;", "Stores Department", "080-2366-6424"],

    ["M M Panicker", "Associate Professor G", "Principal Investigator", "080-2366-6050"],

    ["Karthika G.", "Clerk &#039;A&#039;", "Administrative Department", "080-2366-6331"],

    ["Maithly Ramesh", "Admin Assistant &#039;C&#039;", "Administrative Department", "080-2366-6333"],

    ["N. Ramprasad", "Clerk &#039;B&#039;", "Administrative Department", "080-2366-6334"],

    ["S. Ashok Rao", "Admn. Officer &#039;D&#039; (Establishment)", "Administrative Department", "080-2366-6332"],

    ["S.B. Saraswathi", "Administrative Officer &#039;B&#039;", "Administrative Department", "080-2366-6301"],

    ["Valsala Neyyan", "Administrative Assistant", "Administrative Department", "080-2366-6206"],

    ["Allwyn V R", "Junior Engineer &#039;B&#039;", "Instrumentation Dept.", "080-2366-6052"],

    ["Awadhesh Pandit", "Scientific Officer &#039;D&#039;", "Next Generation Geomics Facility", "080-2366-6570"],

    ["Indu Bala", "Clerk &#039;A&#039;", "Accounts Department", "080-2366-6330"],

    ["Srinidhi V", "Accounts Officer &#039;C&#039;", "Accounts Department", "080-2366-6494"]];

var lectureHalls = [["Annex", "Meeting Room", "Admin Block", "Second Floor", "Director's Office", "Meeting Room"],
    ["Axon", "VC Room", "Admin Block", "Second Floor", "Inside Dean's Office", "Video Confenerce Room"],
    ["Banganapalli", "Old Teaching Lab", "Admin Block", "Basement", "Below Account Section", "Teaching Lab"],
    ["Bleb", "GF Meeting Room", "Admin Block", "Ground Floor", "In front of Account Section", "Meeting Room"],
    ["Centriole ", "CCAMP Meeting Room", "CCAMP Building", "First Floor", "CCAMP Building", "Meeting Room"],
    ["Chausa", "CCAMP Seminar Hall", "CCAMP Building", "Ground Floor", "CCAMP Building", "Seminar Hall"],
    ["Chloroplast", "S-03 Seminar Hall", "Eastern Labs", "Second Floor", "Next to Sowdhamini's Lab", "Seminar Hall"],
    ["Cilium", "FF Meeting Room", "Admin Block", "First Floor", "Next to Architect office", "Meeting Room"],
    ["Dasheri", "200 Seater", "Southern Labs", "Ground Floor", "Towards Reception", "Auditorium"],
    ["Endosome", "SLCFF Seminar Hall", "Southern Labs", "First Floor", "Towards Canteen", "Seminar Hall"],
    ["Faculty Lounge", "Faculty Lounge", "Southern Labs", "Second Floor", "Towards Reception", "Meeting Room"],
    ["Golgi", "S-02 Seminar Hall", "Eastern Labs", "First Floor", "In front of Jayant's Lab", "Seminar Hall"],
    ["Haapus ", "LH-1", "Eastern Labs", "Ground Floor", "In front of reception", "Lecture Hall"],
    ["Himsagar", "LH-3", "Eastern Labs", "Second Floor", "In front of Wildlife office", "Lecture Hall"],
    ["Langra", "LH-2", "Eastern Labs", "First Floor", "Above reception", "Lecture Hall"],
    ["Malgova", "70 Seater", "Southern Labs", "Second Floor", "Next to Library", "Auditorium"],
    ["Meeting room (Admin) ", "Meeting room (Admin) ", "Admin Block", "Third Floor", "RDO", "Meeting Room"],
    ["Mitochondrion", "SLCSF Seminal Hall", "Southern Labs", "Second Floor", "Towards Canteen", "Seminar Hall"],
    ["Nucleus", "S-01 Seminar Hall", "Eastern Labs", "Ground Floor", "Next to Lab Support", "Seminar Hall"],
    ["Plasmid", "15 seater", "Eastern Labs", "Second Floor", "Near Fly Facility", "Open Air Meeting Space"],
    ["Raspuri", "New Teaching Lab", "Southern Labs", "Ground Floor", "Next to tennis court", "Teaching Lab"],
    ["Ribosome", "GF Seminar Hall", "CCAMP Building", "Ground Floor", "N/A", "Seminar Hall"],
    ["Safeda", "40 Seater", "Southern Labs", "Second Floor", "Towards Canteen", "Auditorium"],
    ["Synapse", "SLCGF Seminar Hall", "Southern Labs", "Ground Floor", "Towards Canteen", "Seminar Hall"],
    ["Vacuole", "15 seater", "Eastern Labs", "Second Floor", "Near Collection Room", "Open Air Meeting Space"],
    ["Vesicle", "Oases", "Eastern Labs", "First Floor", "In front of CBI counter", "pen Air Meeting Space"]];
