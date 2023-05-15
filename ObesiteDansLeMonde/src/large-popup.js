export function popup() {
    return `
  <div id="large-popup" " style=" background-color: rgba( 242 , 165 , 87, 0.88);">
      <h4 id="country-name"></h4>
      <p>Taux IMC : <span id="average"></span></p>
      <p>Femme : <span id="female"></span></p>
      <p >Homme : <span id="male"></span></p>
  
        <div"> </br>
      <p style="text-align:center;">Plat Principale du Pays  </br> 
      <span id="plat" style="color:black;"></span></p>
  
      <div id="graph"></div>
      
      <p style="text-align:center; font-size:12px; color:black;"> Données de 2014 </p>
      
      
      </div>
      <!-- Ajoutez d'autres éléments ici pour afficher les informations supplémentaires -->
  </div>
  `;
  }
  

  export function popup2() {
    return `
      <div id="large-popup" style=" background-color: rgba(119, 181, 254, 0.88);">
          <h4 id="country-name"></h4>
          <p>Taux d'obésité: <span id="obesityRate"></span></p>
          <p>Rang: <span id="rank"></span></p>
          <p>Population: <span id="population"></span></p>
            </br>
          <div>
        <p style="text-align:center;">Plat Principale du Pays : </br> 
  
        <span id="plat" style="color:black;"></span></p>
        <div id="graph"></div>
        <p style="text-align:center; font-size:12px; color:white;"> Données de 2023 </p>

            <!-- Ajoutez d'autres éléments ici pour afficher les informations supplémentaires -->
        </div>
    `;
  }
  