<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="4" md="3" lg="2">
        <svg viewBox="0 0 837 1045" xmlns="http://www.w3.org/2000/svg">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none">
            <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
                  id="Polygon-1" stroke="#68c950" stroke-width="6"></path>
            <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
                  id="Polygon-2" stroke="#68c950" stroke-width="6"></path>
            <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
                  id="Polygon-3" stroke="#68c950" stroke-width="6"></path>
            <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
                  id="Polygon-4" stroke="#68c950" stroke-width="6"></path>
            <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
                  id="Polygon-5" stroke="#68c950" stroke-width="6"></path>
          </g>
        </svg>
      </v-col>
      <v-col cols="8" md="6" lg="6" >
        <div class="message-box">
          <h1>404</h1>
          <p>Oups!</p>
          <p>Il semble que nous n'ayons pas trouvé la page que vous recherchiez</p>
          <div class="buttons-con">
            <router-link to="/backoffice" style="text-decoration: none">
              <v-btn color="success" rounded>Retour à l'accueil</v-btn>
            </router-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: '404'
}
</script>
