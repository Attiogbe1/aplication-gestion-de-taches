
 var taches= {
    id:0,
    noms:"",
    heurel:"",
    daten:"",
    termine:false,
    iputche:false,
    dater:""
  };
const icon=document.querySelector('.ajouter');
const pb=document.querySelector('.form');
    document.addEventListener(("DOMContentLoaded"),(e)=>{
      miseAjour();
      
         e.preventDefault();
          let heuract;
          let minuteactuel;
          let yearctul;
          let moiactul;
          let jouractuel;
          let datef
          
           setInterval(() => 
           {
             let day = new Date();
              let hh = day.getHours() * 30;
              let mi = day.getMinutes() * 6;
              let ss = day.getSeconds() * 6;
              let h = day.getHours();
              let m = day.getMinutes();
              let s = day.getSeconds();
              let year = day.getFullYear();
              let moi =day.getMonth()+1;
              let jour =day.getDate();

           if(h>12)
           {
              h=h-12;
            }
               h=(h<10)? "0"+h:h;
               m=(m<10)? "0"+m:m;
               s=(s<10)? "0"+s:s;
               jour=(jour<10)? "0"+jour:jour;
                moi=(moi<10)? "0"+moi:moi;
               heuract=h;
                minuteactuel=m;
                yearctul=year;
                moiactul =moi;
                jouractuel =jour;
                datef=day;
               });
/****apel à la fonctonajouter */
               
  icon.addEventListener('click',(e)=>{
  buttonClique=true;
  var cle=e.timeStamp;
  var cles= "tache_"+ cle;
       Add(cles);  
  })
  readAll();
  /***apell à la fonctionsuprimer */
   var suprime = [...document.querySelectorAll('.supprimer')];
   var tachesf = [...document.querySelectorAll('.tache')];
   for (var i = 0; i < tachesf.length; i++) 
   {
       suprime[i].addEventListener('click', (event) => 
       {
          var bouton = event.target;
           var tacheASupprimer = bouton.closest('.tache');
        if (tacheASupprimer) 
        {
          var enfant =tacheASupprimer.firstElementChild;
         delect(enfant);
         }
     });
   }
/***apell à la fonction mofier */
   var suprime = [...document.querySelectorAll('.modifier')];
   var tachesf = [...document.querySelectorAll('.tache')];
   
   for (var i = 0; i < tachesf.length; i++) {
     suprime[i].addEventListener('click', (event) => {
       var bouton = event.target;
       var tacheASupprimer = bouton.closest('.tache');
       if (tacheASupprimer) {
        var enfant =tacheASupprimer.firstElementChild;
         modifier(enfant)

       }
     });
    
   
   }
    setInterval(()=>{
      miseAjour();
    })
   
  


    setInterval(()=>{
      specification();
    },1000)
  
  
 })
 function Add(cle) 
 {
  const nom = document.getElementById('noms');
  const heure = document.getElementById('times');
  const dates = document.getElementById('dates');
  const currentDate = new Date();
    const anneee = currentDate.getFullYear();
    const moisannee = currentDate.getMonth() + 1; 
    const jourannné= currentDate.getDate();
    const heureanne = currentDate.getHours();
   const minuteanne= currentDate.getMinutes();
   
 

  if (nom.value === '' || dates.value === '' || heure.value === '')
   {
    alert("Veuillez remplir le formulaire");
   }
   else if (tacheExiste(nom.value))
    {
       if (window.confirm("La tâche existe déjà. Voulez-vous la modifier ?"))
        {
          const keys = Object.keys(localStorage);
          for (const key of keys) 
          {
            const local = JSON.parse(localStorage.getItem(key));
             if (local !== null && nom.value.trim() === local.noms.trim())
           {   
            
            const dateeure=heure.value;
                const dateParts = dateeure.split(":");
                  const hour = parseInt(dateParts[0]);
                 const minute = parseInt(dateParts[1]);
                 const dateabbe=dates.value;
                    const datePart=dateabbe.split("-");
                    const year = parseInt(datePart[0]);
                  const month = parseInt(datePart[1]) -1;
                  const day = parseInt(datePart[2]);
                const dateObject =new Date(year, month, day ,hour,minute)
               istermine(dateObject).then((terminer) => {
              if (terminer)
              {
                const tache=
                {
                  id:local.id,
                  noms:nom.value,
                  daten:dates.value,
                  iputche:false,
                  heurel:heure.value,
                  dates:anneee+":"+moisannee+":"+jourannné+":"+heureanne+":"+minuteanne,
                  termine:true
                 }
                  localStorage.removeItem(key);
                 localStorage.setItem(cle, JSON.stringify(tache));
              }
              else
              {
                const tache=
                {
                  id:cle,
                  noms:nom.value,
                  daten:dates.value,
                  iputche:false,
                  heurel:heure.value,
                  dates:anneee+":"+moisannee+":"+jourannné+":"+heureanne+":"+minuteanne,
                  termine:false,
                  }
                  localStorage.removeItem(key);
                  localStorage.setItem(cle, JSON.stringify(tache));
              }
            
             })   
                
           }
              
         }
            
      }
  
    }
     else 
   {
    const tache = 
    {
      id: cle,
      noms: nom.value,
      heurel: heure.value,
      daten: dates.value,
      termine: false,
      iputche: false,
      dates:anneee+":"+moisannee+":"+jourannné+":"+heureanne+":"+minuteanne,
    };
    
    localStorage.setItem(cle, JSON.stringify(tache));
    
    }
  }            
 function  readAll()
   {
     const listes=document.querySelector('.liste');
    
     var keys = [...Object.keys(localStorage)];
      for(var j=0;j<keys.length;j++)
        {
          var local =JSON.parse(localStorage.getItem(keys[j].toString()));
          if (local!=null)
            {
                listes.innerHTML+=`<form class="tache" draggable="true">
                              <span id="${local.daten}">
                              ${local.noms}</span>
                              <button type="button"
                               class ="supprimer"><i class="fas fa-delete-left"></i>supprimer</button>
                               <button type="button"
                               class ="modifier"><i class="fas fa-edit"></i>modifier</button>
                               <label for="${keys[j]}"></label>
                          <input type="checkbox" id="${keys[j]}"class="checkbox" placeholder="3" />

                               
                          </form> 
                          `
             }  
           
             
        }
       
        
  }
 function delect(name)
 {
  
   var keys = [...Object.keys(localStorage)];
       for(var j=0;j<keys.length;j++)
         {
           var local =JSON.parse(localStorage.getItem(keys[j].toString()));
           if(local!=null)
             {
               var pare=name.parentNode;
          
               if(name.innerHTML.trim()===local.noms.trim())
               
               {
                   for(var k=0;k<localStorage.length;k++)
                      {
                          var valecle=localStorage.key(k);
                          var Objetct2=localStorage.getItem(valecle);
                          var val=JSON.parse(Objetct2);
                          if (val!==null && 
                             JSON.stringify(val)==JSON. stringify(local))
                           {
                            localStorage.removeItem(valecle);
                                pare.classList.add('netoyer');
                                pare.classList.remove('tache');
                                localStorage.removeItem(valecle);
                               
                             }
                            else
                             {
                             console.log("hello");
                             }
                       }
                
                }
              }
          }
 }

function modifier(name)
  {
  
    const nom = document.getElementById("noms");
    const heure = document.getElementById('times');
    const dates = document.getElementById('dates');
     var keys = [...Object.keys(localStorage)];
    for(var j=0;j<keys.length;j++)
    {
      var local =JSON.parse(localStorage.getItem(keys[j].toString()));
      if(local!=null)
        {
          var pare=name.parentNode;
          
          if(name.innerHTML.trim()===local.noms.trim())
          {
                     var Objetct2=localStorage.getItem(keys[j]);
                
                     var val=JSON.parse(Objetct2);
                      if (val!==null && 
                         JSON.stringify(val)==JSON.stringify(local))
                       {
                           nom.value=local.noms
                           const heureArray = local.heurel.split(':');
                           const heures = heureArray[0];
                           const minutes = heureArray[1]
                           heure.value=`${heures}:${minutes}`
                           const dateArray = local.daten.split('-');
                           const annee = dateArray[0];
                           const mois = dateArray[1];
                           const jour = dateArray[2];
                           const dat =`${annee}-${mois}-${jour}`;
                              dates.value=dat;
                              localStorage.removeItem(keys[j])
                          
                           break;
                          }
                          
                         else
                           {
                             console.log("hello");
                           }
                  
            }
        }
   
    }
 }
    
  function specification()
 {
 
   var keys = [...Object.keys(localStorage)];
    keys.forEach(function(key) {
    var local = JSON.parse(localStorage.getItem(key));
     if (local != null) 
        {
         
        var dateFin=local.daten+":"+local.heurel;
          var tg = document.getElementById(local.daten);
          var parent = tg.parentElement;
          var gp = tg.parentElement;
          var checkboxes =[...gp.querySelectorAll(".checkbox")];
          var label =[...gp.querySelectorAll("label")];
             
     label.forEach(function(lab)
     {

          checkboxes.forEach(function(checkbox)
           {

           
              parent = checkbox.parentElement;
              var enfe= parent.querySelector("span")
              misejourApresCheck(checkbox);
              
              if(local.iputche)
                  
                 { 
                   
                     if(local.termine)
                     
                      {
                      enfe.classList.add("marquetermine");
                      enfe.classList.remove("rouge-vif");
                      lab.textContent="terminé";
                       }
                       else
                        {
                         objet=identifierJourTach(dateFin)
                          lab.textContent=objet.nom+":"+objet.minuterest;
                          enfe.classList.remove("marquetermine");
                           enfe.classList.remove("rouge-vif");
                             lab.textContent="en cours"
    
                          }
                   
                          }
                         else {
                             
                            if (local.termine)
                            {
                              objet=identifierJourTach(dateFin)
                        lab.textContent=objet.nom+":"+objet.minuterest;
                           enfe.classList.add("rouge-vif");
                           enfe.classList.remove("marquetermine");
                           
                           }
                         }

            
          
        })
      })
      
      const dateParts = local.dates.split(":");
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) -1;
      const day = parseInt(dateParts[2]);
      const hour = parseInt(dateParts[3]);
     const minute = parseInt(dateParts[4]);
    const dateObject =new Date(year, month, day ,hour,minute)
isnew(dateObject).then((isNew) => {
  if (isNew && local.termine===false)
  
   {
    
             
    label.forEach(function(lab)
    {

    
   

    checkboxes.forEach(function(checkbox)
           {

           
              parent = checkbox.parentElement;
              var enfe= parent.querySelector("span")
              lab.textContent="nouvelle";
            
            })
          })
  } 
  else 
  {
    if(local.termine===false)
    
    checkboxes.forEach(function(checkbox)
    {

    
       parent = checkbox.parentElement;
       var enfe= parent.querySelector("span")
       enfe.classList.remove("newtache");
     
     })
  }
});

                
    
          
 }
 });
}
     
function istermine(datenf) {
  return new Promise((resolve) => {
    var currentDate = new Date();
        
    if (currentDate < datenf)
     {
       resolve(false);
      } 
      else 
      {
          resolve(true); 
       }
  });
    }
function isnew(dateajour){
return new Promise((resolve) => {
  var currentDate = (new Date(dateajour)-new Date())/1000;
      
  if (currentDate<30)
   {
     resolve(true);
    } 
    else 
    {
        resolve(false); 
     }
});
  }       
 const sortableList = new Sortable(document.querySelector('.liste'),
   {
     animation: 140,
     onStart(evt)
      {
         const item = evt.item;
        item.classList.add('dragging');
       },
      onEnd(evt) 
      {
        const item = evt.item;
        item.classList.remove('dragging');
      },
   });
 function miseAjour(){
    var fini;
    var keys = [...Object.keys(localStorage)];
     keys.forEach(function(key) {
    var local = JSON.parse(localStorage.getItem(key));
     if (local != null){
       var dateFin = local.daten + ":" + local.heurel;
       var dat = dateFin.replace(/-/g, ":");
       const dateParts = dat.split(":");
       const year = parseInt(dateParts[0]);
       const month = parseInt(dateParts[1]) -1;
       const day = parseInt(dateParts[2]);
       const hour = parseInt(dateParts[3]);
      const minute = parseInt(dateParts[4]);
     const dateObject =new Date(year, month, day ,hour,minute)
   istermine(dateObject).then((estTerminee) =>
    {
        if (estTerminee) 
        {
           local.termine=true;
             taches={
               id:key,
                noms:local.noms,
                heurel:local.heurel,
                daten:local.daten,
                termine:local.termine,
                iputche:local.iputche,
                dates:local.dates
                };
        localStorage.removeItem(key);
  localStorage.setItem(key,JSON.stringify(taches));
                 
  }
   else{
    local.termine=false;
 }
               
  })
 }
 })
  }
function identifierJourTach(dateTachs){
  var minurest;
  var obresta=minuterestant(dateTachs);
  if(obresta.estil===true){
    if(obresta.moth===0){
    if(obresta.days===0)
     {
         if(obresta.hours===0)
         {
           if(obresta.minutes===0){
            minurest={
              nom:"encour",
              minuterest:obresta.seconds+"s",
           }
           }
           else{
            minurest={
              nom:"encour",
              minuterest:obresta.minutes+"m",
           }
           }
         }
        
         else{
          minurest={
            nom:"encour",
            minuterest:obresta.hours+"h",
         }
         }  
     
    }
     else{
      minurest={
        nom:"encour",
        minuterest:obresta.days+"jour",
     }
     }
    
  }
  else{
    minurest={
      nom:"encour",
      minuterest:obresta.moth+"mois"
    }
  }
}

  else{
    if(obresta.moth===0){

    
    if(obresta.days===0)
    {
        if(obresta.hours===0)
        {
          if(obresta.minutes===0){
           minurest={
             nom:"retard",
             minuterest:obresta.seconds+"s",
          }
          }
          else{
           minurest={
             nom:"retard",
             minuterest:obresta.minutes+"m",
          }
          }
        }
        else{
         minurest={
           nom:"retard",
           minuterest:obresta.hours+"h",
        }
        }
    }
    else{
     minurest={
       nom:"retard",
       minuterest:obresta.days+"jour",
    }
    }
 }
 else{
  minurest={
    nom:"retard",
    minuterest:obresta.moth+"mois",
 }
 }
}
  
 return minurest;

}
function minuterestant(dateTache){
var differenceInMilliseconds = new Date(dateTache)-new Date();
var difference=[];
     if(differenceInMilliseconds>0)
     {
      difference = {
        moth: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24*30)), 
        days: Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)), // Jours
        hours: Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 
        minutes: Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)), 
        seconds: Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000) ,
        estil:true
    };
     }
     else{
      difference = {
        moth: Math.floor(-differenceInMilliseconds / (1000 * 60 * 60 * 24*30)),
        days: Math.floor(-differenceInMilliseconds / (1000 * 60 * 60 * 24)), // Jours
        hours: Math.floor((-differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 
        minutes: Math.floor((-differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)), 
        seconds: Math.floor((-differenceInMilliseconds % (1000 * 60)) / 1000) ,
        estil:false
    };

     }

return difference;

}

function misejourApresCheck( chech){
 chech.addEventListener("change",()=>{
  etatChecbos=chech.checked;
  var key=[...Object.keys(localStorage)];
  
 
  for(var j=0;j<key.length;j++)
         {
           var local =JSON.parse(localStorage.getItem(key[j].toString()));
           if(key[j]===chech.id)
             {
                  local.iputche=etatChecbos;

                  taches={
                    id:key[j],
                     noms:local.noms,
                     heurel:local.heurel,
                     daten:local.daten,
                     termine:local.termine,
                     iputche:local.iputche,
                     dates:local.dates
                     };
             localStorage.removeItem(key);
       localStorage.setItem(key[j],JSON.stringify(taches));

             }
            
            
        }

 })
}

function tacheExiste(nom) {
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    const local = JSON.parse(localStorage.getItem(key));
    if (local !== null && nom.trim() === local.noms.trim()) {
      return true;
    }
  }
  return false;
}
 let hr = document.querySelector("#her");
 let min = document.querySelector("#min");
 let sec = document.querySelector("#sec");
 let hour = document.querySelector("#hour");
 let munites = document.querySelector("#minutes");
 let secods = document.querySelector("#seconds");
 let asym = document.querySelector("#asym");
 setInterval(() => {
     let day = new Date();
     let hh = day.getHours() * 30;
     let mi = day.getMinutes() * 6;
     let ss = day.getSeconds() * 6;
     let h = day.getHours();
     let m = day.getMinutes();
     let s = day.getSeconds();
     let va = hh + (mi / 12);
     hr.style.transform = "rotateZ(" + va + "deg)";
     min.style.transform = "rotateZ(" + mi + "deg)";
     sec.style.transform = "rotateZ(" + ss + "deg)";
     var am = h >= 12 ? "PM" : "AM";
     if(h>12){
         h=h-12;
     }
     h=(h<10)? "0"+h:h;
     m=(m<10)? "0"+m:m;
     s=(s<10)? "0"+s:s;
     hour.innerHTML = h;
     munites.innerHTML = m;
     secods.innerHTML = s;
     asym.innerHTML = am;
 })
 
 
 