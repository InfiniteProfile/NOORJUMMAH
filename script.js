'use strict';

/*
 * NOORJUMMAH identity generator — generation version 1.
 * Identities are fictional and deterministic: the same decimal identifier
 * always maps to the same generated profile in this version.
 * The numeric identifier itself is never converted to JavaScript Number.
 */
(() => {
  const GENERATOR_VERSION = 'v1';
  const INITIAL_COUNT = 36;
  const BATCH_SIZE = 18;
  const MAX_RENDERED = 72;
  const REBASE_SPACER_AT = 900000;

  const REGIONS = [
    {
      name: 'Bengali', setting: 'Bangladesh-inspired', languages: ['Bengali', 'Bangla', 'English'],
      masc: ['Muhammad', 'Mohammad', 'Ahmed', 'Imran', 'Tanvir', 'Farhan', 'Rakib', 'Sakib', 'Mahmud', 'Raihan', 'Shihab', 'Nayeem', 'Tahmid', 'Anik', 'Zubair', 'Arham', 'Tamim', 'Nafis', 'Rafi', 'Adnan', 'Fahim', 'Tawhid', 'Muntasir', 'Siam', 'Junaid', 'Ayman'],
      fem: ['Ayesha', 'Aisha', 'Fatima', 'Nusrat', 'Tasnim', 'Tasneem', 'Sumaiya', 'Jannat', 'Mehjabin', 'Sharmin', 'Sadia', 'Fariha', 'Tanzila', 'Madiha', 'Tasmia', 'Rukaiya', 'Humaira', 'Nadiya', 'Samia', 'Tamanna', 'Ishrat', 'Lamia', 'Anika', 'Naima'],
      neutral: ['Noor', 'Nur', 'Iman', 'Tasnim', 'Rayan', 'Sami', 'Mahin', 'Ariyan', 'Nuri', 'Inara'],
      middle: ['Zayan', 'Amin', 'Faisal', 'Rayhan', 'Karim', 'Ibrahim', 'Samiul', 'Abrar', 'Yasin', 'Muntasir', 'Afnan', 'Nabil', 'Tahsin', 'Nawar'],
      surnames: ['Rahman', 'Hossain', 'Ahmed', 'Islam', 'Hasan', 'Khan', 'Chowdhury', 'Kabir', 'Mahmud', 'Miah', 'Siddique', 'Haque', 'Uddin', 'Sarker', 'Bhuiyan', 'Akter', 'Jahan', 'Khatun', 'Molla', 'Talukder', 'Alam', 'Faruque']
    },
    {
      name: 'Arabic', setting: 'Arabic-speaking world-inspired', languages: ['Arabic', 'English'],
      masc: ['Muhammad', 'Mohammed', 'Ahmad', 'Omar', 'Umar', 'Ali', 'Hassan', 'Husayn', 'Hamza', 'Yusuf', 'Ibrahim', 'Ismail', 'Musa', 'Idris', 'Khalid', 'Bilal', 'Zayd', 'Tariq', 'Karim', 'Samir', 'Adnan', 'Nabil', 'Fawaz', 'Ayman', 'Malik', 'Rashid'],
      fem: ['Maryam', 'Mariam', 'Aisha', 'Aminah', 'Khadija', 'Zainab', 'Hafsa', 'Ruqayyah', 'Asma', 'Safiya', 'Salma', 'Layla', 'Leila', 'Zahra', 'Amira', 'Yasmin', 'Noura', 'Huda', 'Rania', 'Farah', 'Inaya', 'Aliya', 'Hiba', 'Lina'],
      neutral: ['Noor', 'Nur', 'Iman', 'Amal', 'Salam', 'Bayan', 'Rayan', 'Safa', 'Sami', 'Joud'],
      middle: ['Abdul Rahman', 'Abdul Aziz', 'Abdul Karim', 'Ibn Sami', 'Taha', 'Yasin', 'Mustafa', 'Faris', 'Zaki', 'Nour', 'Amjad', 'Fadi', 'Salah', 'Rami'],
      surnames: ['Hassan', 'Hussein', 'Rahman', 'Mansour', 'Khalil', 'Farouk', 'Nasser', 'Saleh', 'Hamdan', 'Darwish', 'Qadir', 'Abbas', 'Malik', 'Aziz', 'Najjar', 'Hakim', 'Said', 'Fayed', 'Moussa', 'Karim', 'Rashid', 'Jabari']
    },
    {
      name: 'Pakistani & Indian Muslim', setting: 'South Asian-inspired', languages: ['Urdu', 'Hindi', 'English'],
      masc: ['Muhammad', 'Mohammad', 'Ahmed', 'Abdullah', 'Ali', 'Usman', 'Ahsan', 'Hamza', 'Danish', 'Fahad', 'Faraz', 'Arif', 'Irfan', 'Salman', 'Saad', 'Talha', 'Zubair', 'Faisal', 'Rehan', 'Adeel', 'Shahzaib', 'Haris', 'Aariz', 'Zayan'],
      fem: ['Ayesha', 'Fatima', 'Zainab', 'Sana', 'Hira', 'Iqra', 'Mahira', 'Nadia', 'Rabia', 'Sadia', 'Amina', 'Maryam', 'Zoya', 'Saira', 'Kiran', 'Anam', 'Mehwish', 'Farah', 'Saba', 'Hina', 'Inaya', 'Sumbul', 'Areeba', 'Aleena'],
      neutral: ['Noor', 'Iman', 'Areej', 'Samar', 'Rayan', 'Sami', 'Afnan', 'Hadi', 'Zia', 'Shayan'],
      middle: ['Raza', 'Abbas', 'Amin', 'Hussain', 'Mustafa', 'Ibrahim', 'Yousuf', 'Haider', 'Ahmed', 'Tariq', 'Noman', 'Javed', 'Shah', 'Rafi', 'Azeem'],
      surnames: ['Khan', 'Malik', 'Qureshi', 'Siddiqui', 'Mirza', 'Sheikh', 'Ansari', 'Syed', 'Rizvi', 'Chaudhry', 'Farooqi', 'Hashmi', 'Bukhari', 'Naqvi', 'Abbasi', 'Shah', 'Akhtar', 'Iftikhar', 'Mehmood', 'Ali']
    },
    {
      name: 'Indonesian & Malay', setting: 'Southeast Asian-inspired', languages: ['Indonesian', 'Malay', 'English'],
      masc: ['Muhammad', 'Ahmad', 'Rizky', 'Fajar', 'Dimas', 'Arif', 'Reza', 'Fahri', 'Rafi', 'Ilham', 'Aqil', 'Hafiz', 'Iqbal', 'Farhan', 'Naufal', 'Aditya', 'Dani', 'Azlan', 'Imran', 'Hakim', 'Firdaus', 'Zaki', 'Syafiq', 'Amir'],
      fem: ['Nurul', 'Aisyah', 'Siti', 'Putri', 'Zahra', 'Nabila', 'Alya', 'Farah', 'Amira', 'Hana', 'Dewi', 'Intan', 'Salsabila', 'Aqilah', 'Nadia', 'Safiya', 'Maisarah', 'Balqis', 'Laila', 'Anisa', 'Amani', 'Husna', 'Syifa', 'Zulaikha'],
      neutral: ['Nur', 'Iman', 'Ari', 'Aman', 'Rai', 'Safa', 'Dara', 'Nuri', 'Alya', 'Ananda'],
      middle: ['Hakim', 'Faris', 'Akmal', 'Yusuf', 'Ibrahim', 'Amin', 'Iskandar', 'Firman', 'Rasyid', 'Azmi', 'Syahmi', 'Hidayat', 'Fauzan', 'Zulfikar'],
      surnames: ['Putra', 'Putri', 'Wijaya', 'Pratama', 'Saputra', 'Hidayat', 'Santoso', 'Rahman', 'Hakim', 'Ismail', 'Abdullah', 'Yusof', 'Ibrahim', 'Azman', 'Hassan', 'Ramli', 'Nordin', 'Salleh', 'Fauzi', 'Wibowo']
    },
    {
      name: 'Turkish', setting: 'Anatolian-inspired', languages: ['Turkish', 'English'],
      masc: ['Mehmet', 'Muhammed', 'Ahmet', 'Mustafa', 'Emir', 'Yusuf', 'Kerem', 'Arda', 'Eren', 'Burak', 'Deniz', 'Mert', 'Kaan', 'Ali', 'Omar', 'Ibrahim', 'Selim', 'Can', 'Baran', 'Taha', 'Furkan', 'Hakan', 'Yunus', 'Cem'],
      fem: ['Zeynep', 'Elif', 'Ayse', 'Aylin', 'Meryem', 'Fatma', 'Esra', 'Leyla', 'Yasemin', 'Defne', 'Nisa', 'Ece', 'Sena', 'Derya', 'Selin', 'Hafsa', 'Zehra', 'Mina', 'Amine', 'Melek', 'Irem', 'Rabia', 'Asli', 'Inci'],
      neutral: ['Deniz', 'Eren', 'Derya', 'Evren', 'Aydin', 'Ilhan', 'Umut', 'Safa', 'Yaren', 'Nihan'],
      middle: ['Can', 'Emre', 'Selim', 'Murat', 'Yigit', 'Cem', 'Kemal', 'Baris', 'Tuncay', 'Bora', 'Onur', 'Tarik', 'Ismail', 'Hakan'],
      surnames: ['Yilmaz', 'Kaya', 'Demir', 'Sahin', 'Celik', 'Yildiz', 'Yildirim', 'Ozturk', 'Aydin', 'Ozdemir', 'Arslan', 'Dogan', 'Kilic', 'Aslan', 'Koc', 'Polat', 'Kurt', 'Guler', 'Tekin', 'Kaplan']
    },
    {
      name: 'Persian & Afghan', setting: 'Persianate-inspired', languages: ['Persian', 'Dari', 'Pashto', 'English'],
      masc: ['Amir', 'Arman', 'Omid', 'Farid', 'Navid', 'Kian', 'Reza', 'Hamid', 'Javid', 'Sami', 'Zubair', 'Yusuf', 'Ibrahim', 'Ahmad', 'Wahid', 'Fahim', 'Ehsan', 'Amin', 'Bilal', 'Ramin', 'Parsa', 'Naveed', 'Dawood', 'Soroush'],
      fem: ['Zahra', 'Maryam', 'Laila', 'Leila', 'Niloofar', 'Soraya', 'Parisa', 'Shabnam', 'Roya', 'Farah', 'Amina', 'Madina', 'Mahsa', 'Setara', 'Nadia', 'Farnaz', 'Nasrin', 'Mina', 'Samira', 'Yasmin', 'Homa', 'Nilou', 'Arezoo', 'Sahar'],
      neutral: ['Noor', 'Sahar', 'Amin', 'Rayan', 'Mehr', 'Arian', 'Sadaf', 'Raha', 'Darya', 'Nima'],
      middle: ['Rahim', 'Karim', 'Sadiq', 'Jamal', 'Naveed', 'Yasin', 'Shah', 'Farzan', 'Kamal', 'Latif', 'Safi', 'Aziz', 'Feroz', 'Amin'],
      surnames: ['Rahimi', 'Ahmadi', 'Karimi', 'Hosseini', 'Farzan', 'Azimi', 'Safi', 'Qasimi', 'Nouri', 'Habibi', 'Khalili', 'Mansouri', 'Najafi', 'Rostami', 'Ebrahimi', 'Shirazi', 'Noori', 'Wafa', 'Sultani', 'Fayaz']
    },
    {
      name: 'West African', setting: 'West African Muslim-community-inspired', languages: ['Hausa', 'Yoruba', 'English', 'French'],
      masc: ['Abubakar', 'Muhammad', 'Ibrahim', 'Musa', 'Usman', 'Suleiman', 'Mamadou', 'Amadou', 'Boubacar', 'Oumar', 'Issa', 'Sani', 'Bashir', 'Salisu', 'Yakubu', 'Idris', 'Lamin', 'Modou', 'Cheikh', 'Babacar', 'Malik', 'Tijani', 'Faruq', 'Aminu'],
      fem: ['Aminata', 'Aisha', 'Fatoumata', 'Mariama', 'Khadija', 'Zainab', 'Hauwa', 'Maimuna', 'Aminu', 'Rabi', 'Adama', 'Hajara', 'Fatima', 'Mariam', 'Aissatou', 'Fanta', 'Safiya', 'Hafsat', 'Ramata', 'Kaltouma', 'Binta', 'Nana', 'Zara', 'Halima'],
      neutral: ['Iman', 'Sali', 'Safa', 'Amine', 'Nuru', 'Amani', 'Binta', 'Mika', 'Tijani', 'Sadi'],
      middle: ['Abdul', 'Seydou', 'Moussa', 'Ousmane', 'Ibrahima', 'Samba', 'Boubacar', 'Lamine', 'Mamadou', 'Saliou', 'Babacar', 'Cheikh', 'Sani', 'Abdullahi'],
      surnames: ['Diallo', 'Traore', 'Ndiaye', 'Bah', 'Sow', 'Toure', 'Camara', 'Konate', 'Barry', 'Jallow', 'Cisse', 'Drammeh', 'Sy', 'Sane', 'Balde', 'Keita', 'Diop', 'Kone', 'Coulibaly', 'Sarr']
    },
    {
      name: 'East African & Swahili', setting: 'East African-inspired', languages: ['Swahili', 'Somali', 'Arabic', 'English'],
      masc: ['Abdi', 'Ahmed', 'Hassan', 'Mohamed', 'Yusuf', 'Ibrahim', 'Jamal', 'Khalid', 'Hamza', 'Bilal', 'Idris', 'Farah', 'Omar', 'Ayaan', 'Mahad', 'Ismail', 'Salim', 'Suleiman', 'Jibril', 'Said', 'Abdullahi', 'Anwar', 'Rashid', 'Bakari'],
      fem: ['Amina', 'Ayaan', 'Hodan', 'Sahra', 'Hawa', 'Maryam', 'Nimco', 'Zahra', 'Halima', 'Ikram', 'Nura', 'Rahma', 'Fadumo', 'Asma', 'Safiya', 'Sumaya', 'Muna', 'Zainab', 'Fartun', 'Samira', 'Nadia', 'Baraka', 'Asha', 'Khadija'],
      neutral: ['Amani', 'Iman', 'Nuru', 'Noor', 'Salam', 'Jamal', 'Baraka', 'Safa', 'Zuri', 'Taji'],
      middle: ['Abdullahi', 'Mohamed', 'Ali', 'Hussein', 'Abdirahman', 'Jibril', 'Said', 'Ismail', 'Abdi', 'Omar', 'Hassan', 'Musa', 'Jama', 'Farah'],
      surnames: ['Hassan', 'Mohamed', 'Abdi', 'Farah', 'Ali', 'Omar', 'Warsame', 'Nur', 'Jama', 'Ismail', 'Ahmed', 'Said', 'Osman', 'Hussein', 'Abdirahman', 'Mohamud', 'Adan', 'Bakari', 'Mwangangi', 'Salim']
    },
    {
      name: 'Kurdish', setting: 'Kurdish-community-inspired', languages: ['Kurdish', 'Arabic', 'Turkish', 'Persian'],
      masc: ['Azad', 'Baran', 'Dara', 'Dilan', 'Hawar', 'Jiyan', 'Kawa', 'Renas', 'Rojhat', 'Soran', 'Aram', 'Alan', 'Aso', 'Berzan', 'Karwan', 'Miran', 'Nawzad', 'Zana', 'Sherwan', 'Hemin', 'Rebaz', 'Serhat', 'Yadgar', 'Zinar'],
      fem: ['Avin', 'Berfin', 'Dilan', 'Helin', 'Jiyan', 'Rojin', 'Ronahi', 'Zilan', 'Nalin', 'Narin', 'Lavin', 'Viyan', 'Ava', 'Bahar', 'Nujin', 'Rojda', 'Shilan', 'Sarya', 'Darya', 'Leyla', 'Zozan', 'Gulistan', 'Havin', 'Mizgin'],
      neutral: ['Dilan', 'Jiyan', 'Baran', 'Aso', 'Roj', 'Arin', 'Avan', 'Ari', 'Narin', 'Sipan'],
      middle: ['Rojan', 'Aras', 'Kardo', 'Shwan', 'Alan', 'Amin', 'Haval', 'Saman', 'Diyar', 'Sherko', 'Karim', 'Hiwa', 'Miran', 'Aso'],
      surnames: ['Hassan', 'Kurdî', 'Mahmud', 'Rashid', 'Darwish', 'Barzani', 'Talabani', 'Karim', 'Aziz', 'Omar', 'Salih', 'Jaf', 'Harki', 'Sadiq', 'Xelil', 'Mustafa', 'Qadir', 'Ahmed', 'Ismail', 'Ali']
    },
    {
      name: 'Central Asian', setting: 'Central Asian-inspired', languages: ['Uzbek', 'Kazakh', 'Tajik', 'Kyrgyz', 'Russian'],
      masc: ['Aziz', 'Bekzod', 'Dilshod', 'Jasur', 'Rustam', 'Timur', 'Sardor', 'Islom', 'Akmal', 'Daler', 'Farhod', 'Said', 'Sherzod', 'Mirzo', 'Kamol', 'Mansur', 'Javlon', 'Nodir', 'Otabek', 'Suhrob', 'Alisher', 'Anvar', 'Bahrom', 'Davron'],
      fem: ['Malika', 'Madina', 'Zarina', 'Dilnoza', 'Nigina', 'Shahnoza', 'Munisa', 'Gulnora', 'Sevara', 'Sitora', 'Nilufar', 'Farzona', 'Rano', 'Shirin', 'Aziza', 'Mohira', 'Nargiza', 'Lola', 'Yulduz', 'Zuhra', 'Mavluda', 'Gulbahor', 'Madinabonu', 'Dildora'],
      neutral: ['Nur', 'Iman', 'Sami', 'Amin', 'Ravshan', 'Aziz', 'Diyor', 'Mehr', 'Sadaf', 'Arman'],
      middle: ['Abdullah', 'Muhammad', 'Alisher', 'Iskandar', 'Umar', 'Ibrahim', 'Said', 'Karim', 'Shavkat', 'Bahodir', 'Farrukh', 'Olim', 'Jahongir', 'Bek'],
      surnames: ['Karimov', 'Rahimov', 'Ismoilov', 'Yusupov', 'Tursunov', 'Saidov', 'Nazarov', 'Abdullayev', 'Aliyev', 'Rakhmonov', 'Sharipov', 'Mahmudov', 'Qodirov', 'Ergashev', 'Bekov', 'Akhmedov', 'Salimov', 'Murodov', 'Umarov', 'Davlatov']
    },
    {
      name: 'Bosnian & Albanian', setting: 'Balkan Muslim-community-inspired', languages: ['Bosnian', 'Albanian', 'English'],
      masc: ['Amar', 'Adnan', 'Armin', 'Emir', 'Haris', 'Kerim', 'Mirza', 'Tarik', 'Dino', 'Nedim', 'Aldin', 'Benjamin', 'Faruk', 'Jusuf', 'Samir', 'Edin', 'Arber', 'Besnik', 'Ilir', 'Luan', 'Valon', 'Endrit', 'Fisnik', 'Kreshnik'],
      fem: ['Amina', 'Lejla', 'Lamija', 'Emina', 'Ajla', 'Sara', 'Dina', 'Naida', 'Selma', 'Nermina', 'Hana', 'Amela', 'Merima', 'Elma', 'Mirela', 'Arta', 'Elira', 'Besa', 'Era', 'Flutura', 'Mimoza', 'Rina', 'Teuta', 'Vjosa'],
      neutral: ['Emin', 'Dara', 'Sami', 'Noor', 'Iman', 'Ari', 'Nuri', 'Amin', 'Deniz', 'Adel'],
      middle: ['Ahmed', 'Husein', 'Mustafa', 'Ibrahim', 'Jasmin', 'Alen', 'Harun', 'Ismail', 'Dzemal', 'Rasim', 'Ardit', 'Arjan', 'Ylli', 'Lirim'],
      surnames: ['Hodzic', 'Kovacevic', 'Ibrahimovic', 'Delic', 'Hasic', 'Memic', 'Bajrami', 'Gashi', 'Krasniqi', 'Berisha', 'Hoxha', 'Bytyqi', 'Demiri', 'Shala', 'Halili', 'Mehmeti', 'Osmani', 'Aliu', 'Islami', 'Morina']
    },
    {
      name: 'Muslim diaspora', setting: 'European & American Muslim-community-inspired', languages: ['English', 'Arabic', 'French', 'Urdu'],
      masc: ['Adam', 'Zayn', 'Rayyan', 'Ilyas', 'Yusuf', 'Ayaan', 'Hamza', 'Rayan', 'Sami', 'Mikael', 'Idris', 'Omar', 'Zayd', 'Ibrahim', 'Zain', 'Amir', 'Kareem', 'Isa', 'Nuh', 'Amin', 'Malik', 'Elias', 'Nabil', 'Samir'],
      fem: ['Amira', 'Maryam', 'Aaliyah', 'Aliya', 'Amina', 'Zara', 'Layla', 'Maya', 'Noor', 'Iman', 'Safiya', 'Hana', 'Leila', 'Yasmin', 'Aisha', 'Sofia', 'Lina', 'Nadia', 'Sara', 'Hiba', 'Inaya', 'Mariam', 'Zoya', 'Samira'],
      neutral: ['Noor', 'Iman', 'Sami', 'Ari', 'Amal', 'Rayan', 'Amani', 'Zain', 'Safa', 'Amin'],
      middle: ['Ibrahim', 'Rahman', 'Karim', 'Nour', 'Faris', 'Zayd', 'Amin', 'Yasin', 'Malik', 'Rashid', 'Hassan', 'Ayaan', 'Rayyan', 'Idris'],
      surnames: ['Rahman', 'Khan', 'Ahmed', 'Ali', 'Hassan', 'Hussain', 'Malik', 'Patel', 'Abdi', 'Haddad', 'Khalil', 'Farah', 'Qureshi', 'Siddiqui', 'Hussein', 'Osman', 'Aziz', 'Mahmoud', 'Yusuf', 'Noor']
    }
  ];

  const INTEREST_SETS = [
    ['books', 'Islamic art', 'architecture'], ['coding', 'languages', 'calligraphy'],
    ['poetry', 'history', 'tea culture'], ['photography', 'nature', 'design'],
    ['astronomy', 'learning', 'geometric art'], ['music', 'food culture', 'travel stories'],
    ['community projects', 'reading', 'gardening'], ['technology', 'journaling', 'museums'],
    ['cooking', 'crafts', 'cultural history'], ['mathematics', 'nature walks', 'books'],
    ['illustration', 'film', 'language learning'], ['chess', 'science', 'architecture']
  ];
  const BIO_TEMPLATES = [
    'A thoughtful fictional character who enjoys {a}, notices small details, and finds inspiration in {b}.',
    'A curious fictional identity drawn to {a}, with a soft spot for conversations about {b}.',
    'A calm, creative fictional character who spends free time exploring {a} and learning about {b}.',
    'A fictional lifelong learner who likes sharing ideas about {a} and discovering new perspectives through {b}.',
    'An imaginative fictional identity who collects little moments, enjoys {a}, and is always curious about {b}.',
    'A fictional character with a reflective outlook, a love of {a}, and a growing interest in {b}.'
  ];
  const QUOTES = [
    'Let kindness be the light you leave behind.',
    'A curious heart can make the world feel wider.',
    'Small acts of care travel farther than we know.',
    'May learning make us humble, and kindness make us brave.',
    'Every culture carries a thousand stories worth hearing.',
    'Peace grows in the spaces where we listen.'
  ];

  const grid = document.getElementById('profile-grid');
  const topSpacer = document.getElementById('top-spacer');
  const feedStatus = document.getElementById('feed-status');
  const dateLabel = document.getElementById('local-date');
  const dayStatus = document.getElementById('day-status');
  const blessingHeading = document.getElementById('blessing-heading');
  const searchDialog = document.getElementById('search-dialog');
  const profileDialog = document.getElementById('profile-dialog');
  const searchOpen = document.getElementById('search-open');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-query');
  const searchResults = document.getElementById('search-results');
  const searchHint = document.getElementById('search-hint');
  const profileDetailContent = document.getElementById('profile-detail-content');

  let nextId = '1';
  let removedCount = 0;
  let rendered = [];
  let scrollCheckQueued = false;
  let layoutCheckQueued = false;
  let lastColumns = 3;
  let rowPitch = 371;
  const knownProfiles = new Map();

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function incrementDecimal(decimal) {
    const digits = decimal.split('');
    let index = digits.length - 1;
    while (index >= 0 && digits[index] === '9') {
      digits[index] = '0';
      index -= 1;
    }
    if (index < 0) digits.unshift('1');
    else digits[index] = String(Number(digits[index]) + 1);
    return digits.join('');
  }

  function canonicalDecimal(decimal) {
    const cleaned = decimal.replace(/^0+(?=\d)/, '');
    return /^0+$/.test(cleaned) ? null : cleaned;
  }

  function stableHash(text, salt = '') {
    const source = `${GENERATOR_VERSION}|${salt}|${text}`;
    let hash = 2166136261;
    for (let i = 0; i < source.length; i += 1) {
      hash ^= source.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x7feb352d);
    hash ^= hash >>> 15;
    hash = Math.imul(hash, 0x846ca68b);
    hash ^= hash >>> 16;
    return hash >>> 0;
  }

  function pick(array, id, salt) {
    return array[stableHash(id, salt) % array.length];
  }

  function makeInitials(name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (!parts.length) return '✦';
    return (parts.length === 1 ? parts[0].slice(0, 2) : `${parts[0][0]}${parts[parts.length - 1][0]}`).toUpperCase();
  }

  function paddedIdentifier(id) {
    return id.length < 6 ? id.padStart(6, '0') : id;
  }

  function formatIdentifier(id) {
    return `NOOR-${paddedIdentifier(id)}`;
  }

  function createProfile(decimalId) {
    const id = canonicalDecimal(decimalId);
    if (!id) throw new Error('A profile identifier must be a positive decimal integer.');
    const cached = knownProfiles.get(id);
    if (cached) return cached;

    const region = pick(REGIONS, id, 'region');
    const genderCode = stableHash(id, 'presentation') % 3;
    const firstNames = genderCode === 0 ? region.masc : (genderCode === 1 ? region.fem : region.neutral);
    const first = pick(firstNames, id, 'first');
    const middle = pick(region.middle, id, 'middle');
    const surname = pick(region.surnames, id, 'surname');
    const withMiddle = stableHash(id, 'middle-choice') % 4 !== 0;
    const fullName = [first, ...(withMiddle ? [middle] : []), surname].join(' ');
    const language = pick(region.languages, id, 'language');
    const interestSet = pick(INTEREST_SETS, id, 'interests');
    const bioTemplate = pick(BIO_TEMPLATES, id, 'bio');
    const bio = bioTemplate.replace('{a}', interestSet[0]).replace('{b}', interestSet[1]);
    const quote = pick(QUOTES, id, 'quote');
    const hue = 104 + (stableHash(id, 'hue') % 82);
    const profile = {
      id,
      name: fullName,
      initials: makeInitials(fullName),
      region: region.name,
      setting: region.setting,
      language,
      interests: interestSet,
      bio,
      quote,
      hue,
      genderPresentation: genderCode === 0 ? 'Masculine name pattern' : (genderCode === 1 ? 'Feminine name pattern' : 'Gender-neutral name pattern'),
      generatorVersion: GENERATOR_VERSION
    };
    knownProfiles.set(id, profile);
    if (knownProfiles.size > 500) {
      const oldest = knownProfiles.keys().next().value;
      knownProfiles.delete(oldest);
    }
    return profile;
  }

  function profileCard(profile) {
    const tags = profile.interests.slice(0, 2).map((interest) => `<span class="card-tag">${escapeHtml(interest)}</span>`).join('');
    const element = document.createElement('article');
    element.className = 'profile-card';
    element.dataset.profileId = profile.id;
    element.style.setProperty('--hue', profile.hue);
    element.innerHTML = `
      <div class="card-top"><span class="identity-id">${escapeHtml(formatIdentifier(profile.id))}</span><span class="fictional-tag">FICTIONAL</span></div>
      <div class="profile-avatar" aria-hidden="true">${escapeHtml(profile.initials)}</div>
      <h3 class="profile-name">${escapeHtml(profile.name)}</h3>
      <p class="profile-context">${escapeHtml(profile.setting)} · ${escapeHtml(profile.language)}</p>
      <p class="card-bio">${escapeHtml(profile.bio)}</p>
      <div class="card-tags" aria-label="Interests">${tags}</div>
      <div class="card-bottom"><span class="card-quote-mark" aria-hidden="true">“</span><button type="button" class="view-profile" data-open-profile="${escapeHtml(profile.id)}">View identity <span aria-hidden="true">↗</span></button></div>`;
    return element;
  }

  function getColumns() {
    const count = getComputedStyle(grid).gridTemplateColumns.split(/\s+/).filter(Boolean).length;
    return Math.max(1, count || 1);
  }

  function updateGeometry() {
    const firstCard = grid.firstElementChild;
    const style = getComputedStyle(grid);
    const gap = Number.parseFloat(style.rowGap) || 0;
    if (firstCard) rowPitch = firstCard.getBoundingClientRect().height + gap;
    const columns = getColumns();
    lastColumns = columns;
    const rowsAbove = Math.floor(removedCount / columns);
    topSpacer.style.height = `${Math.max(0, rowsAbove * rowPitch)}px`;
  }

  function appendBatch(count = BATCH_SIZE) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const profile = createProfile(nextId);
      fragment.appendChild(profileCard(profile));
      rendered.push({ id: profile.id, profile });
      nextId = incrementDecimal(nextId);
    }
    grid.appendChild(fragment);
    if (rendered.length > MAX_RENDERED) {
      const removeCount = rendered.length - MAX_RENDERED;
      const removed = rendered.splice(0, removeCount);
      removedCount += removed.length;
      for (let i = 0; i < removeCount; i += 1) {
        if (grid.firstElementChild) grid.removeChild(grid.firstElementChild);
      }
    }
    updateGeometry();
    rebaseVirtualSpaceIfNeeded();
    feedStatus.textContent = 'The universe is still unfolding. Keep scrolling to discover more.';
  }

  function rebaseVirtualSpaceIfNeeded() {
    const spacerHeight = Number.parseFloat(topSpacer.style.height) || 0;
    if (spacerHeight < REBASE_SPACER_AT) return;
    const before = window.scrollY;
    topSpacer.style.height = '0px';
    removedCount = 0;
    // Shift document coordinates while leaving the visible content at the same screen position.
    window.scrollTo(0, Math.max(0, before - spacerHeight));
  }

  function checkFeedDepth() {
    let rounds = 0;
    while (rounds < 5) {
      const bottomGap = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (bottomGap > Math.max(1200, rowPitch * 9)) break;
      appendBatch();
      rounds += 1;
    }
    scrollCheckQueued = false;
    // A large jump toward the bottom may need another pass after layout has settled.
    if (document.documentElement.scrollHeight - (window.scrollY + window.innerHeight) < rowPitch * 5) {
      queueScrollCheck();
    }
  }

  function queueScrollCheck() {
    if (scrollCheckQueued) return;
    scrollCheckQueued = true;
    requestAnimationFrame(checkFeedDepth);
  }

  function queueLayoutCheck() {
    if (layoutCheckQueued) return;
    layoutCheckQueued = true;
    requestAnimationFrame(() => {
      const columns = getColumns();
      if (columns !== lastColumns) updateGeometry();
      else updateGeometry();
      layoutCheckQueued = false;
      queueScrollCheck();
    });
  }

  function updateLocalDate() {
    const now = new Date();
    dateLabel.textContent = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(now);
    const isFriday = now.getDay() === 5;
    if (isFriday) {
      dayStatus.textContent = 'Today is Friday · Jumu\'ah Mubarak';
      blessingHeading.textContent = 'Today is Friday—a moment for prayer, reflection, and community.';
      document.body.classList.add('is-friday');
    } else {
      dayStatus.textContent = 'A little Friday light, every day';
      blessingHeading.textContent = 'A moment of peace, wherever the week finds you.';
      document.body.classList.remove('is-friday');
    }
  }

  function openDialog(dialog) {
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  }

  function detailMarkup(profile, exactRequestedId = profile.id) {
    const exactId = String(exactRequestedId);
    const interests = profile.interests.join(', ');
    return `
      <div class="profile-detail-top">
        <div class="profile-avatar" style="--hue:${profile.hue}" aria-hidden="true">${escapeHtml(profile.initials)}</div>
        <div>
          <p class="detail-eyebrow">FICTIONAL IDENTITY · ${escapeHtml(profile.generatorVersion.toUpperCase())}</p>
          <h2 id="detail-name">${escapeHtml(profile.name)}</h2>
          <p class="detail-id">Stable identity: <span class="requested-number">${escapeHtml(formatIdentifier(profile.id))}</span></p>
        </div>
      </div>
      <div class="detail-notice">This is a locally generated fictional character, not a verified real person. Cultural inspiration and a name do not establish any real person's religion or identity.</div>
      ${exactId !== profile.id ? `<p class="detail-biography">Exact identifier entered: <strong class="requested-number">${escapeHtml(exactId)}</strong></p>` : ''}
      <dl class="detail-grid">
        <div class="detail-field"><dt>Cultural inspiration</dt><dd>${escapeHtml(profile.setting)} (${escapeHtml(profile.region)})</dd></div>
        <div class="detail-field"><dt>Language</dt><dd>${escapeHtml(profile.language)}</dd></div>
        <div class="detail-field"><dt>Name pattern</dt><dd>${escapeHtml(profile.genderPresentation)}</dd></div>
        <div class="detail-field"><dt>Generator version</dt><dd>${escapeHtml(profile.generatorVersion)} · deterministic</dd></div>
        <div class="detail-field" style="grid-column:1/-1"><dt>Interests</dt><dd>${escapeHtml(interests)}</dd></div>
      </dl>
      <p class="detail-biography">${escapeHtml(profile.bio)}</p>
      <blockquote class="detail-quote">“${escapeHtml(profile.quote)}”</blockquote>`;
  }

  function openProfile(profile, requestedId = profile.id) {
    profileDetailContent.innerHTML = detailMarkup(profile, requestedId);
    closeDialog(searchDialog);
    openDialog(profileDialog);
  }

  function avatarNode(profile) {
    const avatar = document.createElement('div');
    avatar.className = 'profile-avatar';
    avatar.style.setProperty('--hue', profile.hue);
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = profile.initials;
    return avatar;
  }

  function resultRow(profile, queryId = null) {
    const row = document.createElement('div');
    row.className = 'search-result';
    row.appendChild(avatarNode(profile));
    const copy = document.createElement('div');
    copy.className = 'search-result-copy';
    const name = document.createElement('span');
    name.className = 'search-result-name';
    name.textContent = profile.name;
    const meta = document.createElement('span');
    meta.className = 'search-result-meta';
    meta.textContent = `${formatIdentifier(profile.id)} · ${profile.setting} · Fictional`;
    copy.append(name, meta);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'result-open';
    button.textContent = 'Open';
    button.addEventListener('click', () => openProfile(profile, queryId || profile.id));
    row.append(copy, button);
    return row;
  }

  function normalizeSearch(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  }

  function findNameMatches(query) {
    const needle = normalizeSearch(query);
    const matching = [];
    const seen = new Set();
    const add = (profile) => {
      if (seen.has(profile.id)) return;
      const searchBlob = normalizeSearch([
        profile.name, profile.region, profile.setting, profile.language,
        profile.interests.join(' '), profile.bio, profile.quote,
        profile.genderPresentation
      ].join(' '));
      if (searchBlob.includes(needle)) {
        seen.add(profile.id);
        matching.push(profile);
      }
    };

    // Search the live window and recent identities first, including any profile just viewed.
    rendered.forEach((item) => add(item.profile));
    knownProfiles.forEach((profile) => add(profile));

    // The site has no server-side directory. This local deterministic scan finds further matches
    // without downloading data or allocating DOM nodes for thousands of search candidates.
    if (matching.length < 8) {
      let candidateId = '1';
      const limit = 8000;
      for (let i = 0; i < limit && matching.length < 8; i += 1) {
        add(createProfile(candidateId));
        candidateId = incrementDecimal(candidateId);
      }
    }
    return matching.slice(0, 8);
  }

  function showEmptySearch(message) {
    const p = document.createElement('p');
    p.className = 'no-results';
    p.textContent = message;
    searchResults.replaceChildren(p);
  }

  function runSearch(query) {
    const text = query.trim();
    searchResults.replaceChildren();
    if (!text) {
      searchHint.textContent = 'Enter a name, cultural inspiration, language, interest, or positive decimal identifier.';
      return;
    }

    if (/^\d+$/.test(text)) {
      const canonical = canonicalDecimal(text);
      if (!canonical) {
        showEmptySearch('Profile identifiers must be positive integers greater than zero.');
        searchHint.textContent = 'Your entry is preserved exactly; zero is not a profile identifier.';
        return;
      }
      try {
        const profile = createProfile(canonical);
        // Preserve the exact decimal string in the detail view; never parse it as Number.
        openProfile(profile, text);
      } catch (error) {
        showEmptySearch('That identifier could not be generated in this browser. Please try again.');
      }
      return;
    }

    searchHint.textContent = 'Name results are generated locally. An exact numeric ID always opens its deterministic identity directly.';
    searchResults.appendChild(Object.assign(document.createElement('div'), { className: 'search-results-heading', textContent: 'MATCHING FICTIONAL IDENTITIES' }));
    const matches = findNameMatches(text);
    if (!matches.length) {
      showEmptySearch('No local identity matched that phrase in the current search sample. Try a shorter name, a language, a cultural tradition, or the exact decimal profile ID.');
      return;
    }
    const fragment = document.createDocumentFragment();
    matches.forEach((profile) => fragment.appendChild(resultRow(profile)));
    searchResults.appendChild(fragment);
  }

  searchOpen.addEventListener('click', () => {
    openDialog(searchDialog);
    window.setTimeout(() => searchInput.focus(), 40);
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    runSearch(searchInput.value);
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDialog(searchDialog);
  });

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-open-profile]');
    if (!button) return;
    const id = button.dataset.openProfile;
    openProfile(createProfile(id), id);
  });

  window.addEventListener('scroll', queueScrollCheck, { passive: true });
  window.addEventListener('resize', queueLayoutCheck, { passive: true });
  window.addEventListener('orientationchange', queueLayoutCheck, { passive: true });

  // A fallback scroll check keeps the feed replenishing if a browser lacks IntersectionObserver;
  // this implementation deliberately relies on geometry + scroll events instead of one-shot sentinels.
  updateLocalDate();
  window.setInterval(updateLocalDate, 60 * 1000);
  for (let i = 0; i < INITIAL_COUNT; i += BATCH_SIZE) appendBatch(BATCH_SIZE);
  updateGeometry();
  queueScrollCheck();
})();
