

let localstorageJobs =  localStorage.getItem("jobs") ? 
JSON.parse(localStorage.getItem("jobs")) :
[]


  
let content = document.querySelector("main");
const url_jobs = "https://remotive.com/api/remote-jobs?limit=100"
const free_search_url ="https://remotive.com/api/remote-jobs?search=java%20script"
let page ;

let job_arr = []
let job_cat_arr =[]

//אובייקט שמייצג את הדפים שנרצה לדפדף ביניהם בעמוד
const pages = {
    home:'  <div class="jumbotron text-center"> <h1>Welcome to our jobs search services</h1>'+
    '<h4>to use our service all that you need is a good heart , and a little mind</h4></div> <h1>Enjoy!</h1>',
    saved_jobs: '<h1>This is saved jobs</h1>'

}


//פונקציה שאחראית לשנות את הדפים כשנלחץ על כל אפשרות , בעזרת SPA
const getPageContent = (page) => {

    let content_to_return;

    switch(page){

        case 'home':{
            content_to_return = pages.home
            break;
        }

        case 'saved_jobs':{
            content_to_return = pages.saved_jobs
            break;
        }

    default: {
        content_to_return = pages.home
            break;
    }
}

content.innerHTML = content_to_return;
}

//ברגע שהדף נטען שהעמוד הראשון שיופיע יהיה הבית
getPageContent('home')


//פונקציה שאחראית לייצוג הדף של כל העבודות , הדף מייצג באמצעות האייפיאיי 100 עבודות .
async function getAllJobs() {
    try {
        
    await fetch(url_jobs)
    .then(response => response.json())
    .then(data => job_arr = [...data.jobs])
    jobs(job_arr , "home")

} catch (error) {

    console.log("Error!")
    
}  
    }

    const getJobByC = (c) => {
    
    job_cat_arr = []
     job_arr.forEach ( e =>{
      if (e.category === c){
        job_cat_arr.push(e)
      }
    })
        jobs(job_cat_arr,"cat")

}

async function FreeSearchJobs() {
    const s_input = document.getElementById("s_input")
    
    try {
    await fetch(`https://remotive.com/api/remote-jobs?search=${s_input.value}`)
    .then(response => response.json())
    .then(data => jobs(data.jobs))
    s_input.value=''

} catch (error) {

    console.log("Error!")
    
}  
    }
        const jobs = (array,p) => {

           
              //נאפס את העמוד 
              if(p==="saved")
              content.innerHTML = ''
              else
              content.innerHTML = "<div id='loading'><img src='images/loader.webp' style='width:3vw;height:6vh;'></div>"

            
    //קופסא שתכיל את תוכן כל העמוד
         const box = document.createElement("div")
          box.className = "box";
           for(let i =0 ; i < array.length ; i++)  {
            let flag = true;
        //הכרטיסייה שמייצגת כל עבודה 
       
        const card = document.createElement("div")
        card.className = "card"
        
        //שם החברה ככותרת בראש הכרטיסייה
        const company = document.createElement("div")
        company.className = "company"
        company.innerHTML = array[i].company_name

        //לוגו החברה
        const img = document.createElement("img")
        img.id = "img_card"
        img.src = array[i].company_logo

        //כותרת שמכילה את שם התפקיד 
        const title = document.createElement("span")
        title.id = "title"
        title.innerHTML = array[i].title

        //ניצור עוד "קופסה" כדי שהמידע המיוצג בתוכה לגבי העבודה יהיה צמוד לשמאל הכרטיסייה ולא במרכז
        const detailBox = document.createElement("div")
        detailBox.className ="details"

        //תיאור השכר המוצע (משום מה האייפיאיי לא שולף את נתוני השכר גם בסרטון הדוגמא)
        const sal = document.createElement("span")
        sal.innerHTML = "salary: " + array[i].salary

        //תיאור העבודה 
        const description = document.createElement("p")
        description.innerHTML = array[i].description
         
        //הולדה של הפרטים לקופסא שיצרנו 
        detailBox.append(sal,description)

        //ניצור קופסא לאחר הפרטים שתכיל שתי כפתורים 
        const butBox = document.createElement("div")
        butBox.className = "buttons"

        let see = document.createElement("button")
        see.innerHTML = "See the JOB"
        see.id = "see";

        let save = document.createElement("button")
        
        //save.innerHTML = Boolean ? "Save the JOB <span style='font-size:150%;color:#f05656;'>&hearts;</span>"  : "Remove";
        save.className = "save"
        const buttonText = localStorage.getItem(`${array[i].id}`);
        save.innerHTML = "Save the JOB <span style='font-size:150%;color:#f05656;'>&hearts;</span>"
        
        if (buttonText === 'remove') {
            save.innerHTML = 'Remove';
            save.id = 'remove'
          }
          else
          save.id = 'save'
          

        save.addEventListener("click", () => {

            if (save.id === 'save') {
                save.innerHTML = 'Remove';
                // Store the updated button state in localStorage
                localStorage.setItem(`${array[i].id}`, 'remove');
                localstorageJobs.push(array[i])
              } else {
                save.innerHTML = "Save the JOB <span style='font-size:150%;color:#f05656;'>&hearts;</span>";
                // Remove the button state from localStorage
                localStorage.setItem(`${array[i].id}`,'isSaved');
                localstorageJobs = localstorageJobs.filter((job) => job.id !== array[i].id)
              }
              console.log(localStorage)
          //ברגע הפעלת האיוונט עושים לולאה האם המטבע קיים ברשימה בתוך המערך
          //for(let savedJob of localstorageJobs){
          
              //אם הוא קיים מחזיר את ההתראה הבאה
             // if(savedJob.id === array[i].id){
              //    flag = false;
                //  localstorageJobs = localstorageJobs.filter((job) => job.id !== array[i].id)


              //}
            //}

         //דחפתי לתוך המערך אוביקט
        // if(flag!==false){
            //console.log(array[i])
            //localstorageJobs.push(array[i])
         //}
       
        //עידכנתי את הלוקאל סטורנג לפי המערך
        localStorage.setItem('jobs',JSON.stringify(localstorageJobs))
        if(p === "saved"){
            savedJobs()
        }

      })
     
      butBox.append(save,see)

        const type = document.createElement("div")
        type.className = "type"
        type.innerHTML = "type: " + array[i].job_type

        //הולדה של כל פרטי הכרטיסיה 
        card.append(company,img,title,detailBox,butBox,type)
        box.append(card)

    }
    
    //הולדה של כל העמוד בדף
   content.append(box)

   jQuery(document).ready(function() {
    jQuery('#loading').fadeOut(3000);
})}


const savedJobs = () => {
    if(localstorageJobs.length === 0){
        content.innerHTML = "<h1> You still didn't saved any job!</h1>"
    }
    else
    jobs(localstorageJobs,"saved")
}