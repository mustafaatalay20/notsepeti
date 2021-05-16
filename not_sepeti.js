const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSil);
document.addEventListener('DOMContentLoaded',localStorageOku);

function gorevSil(e){
    const tiklanilanEleman = e.target;

    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
        if(confirm('Silmek İstediğinize Emin misiniz?')){
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);
            tiklanilanEleman.parentElement.addEventListener('transitionend',function(){
            tiklanilanEleman.parentElement.remove();
            });
        }
        
      
    }
}

function gorevEkle(e){
    e.preventDefault();

    if(yeniGorev.value.length > 0){
        gorevItemOlustur(yeniGorev.value);
        //not giriş kutusunu boşaltma
        //localstorage kaydetme
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert('Boş Görev Tanımı Olamaz...');
    }

    
    
}

function localStorageDiziyeDonustur(){
    let gorevler;
    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;
}

function localStorageKaydet(yeniGorev){
    let gorevler = localStorageDiziyeDonustur();
    

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}

function localStorageOku(){
    let gorevler = localStorageDiziyeDonustur();

    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev){
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    //tamamlandı butonunu ekleme
    const gorevTamamlandiBtn = document.createElement('button');
    gorevTamamlandiBtn.classList.add('gorev-btn');
    gorevTamamlandiBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamlandiBtn.innerHTML = '<i class="fas fa-check-square"></i>';
    gorevDiv.appendChild(gorevTamamlandiBtn);

    //sil butonunu ekleme
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    gorevDiv.appendChild(gorevSilBtn);


   

    //ul'ye oluşturduğumuz divi ekleme
    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev){
    let gorevler = localStorageDiziyeDonustur();

    //splice ile item silme
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}