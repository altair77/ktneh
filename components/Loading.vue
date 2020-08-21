<template>
  <div v-if="loading" class="loading-page">
    <svg width="204.77" height="205.73" viewBox="0 0 54.178 54.433" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="circle" width="40" height="40" viewBox="-5 -5 40 40">
          <path
            d="M0 15A15 15 0 1 0 15 0"
            fill="none"
            stroke="#ddd" stroke-width="4" stroke-linecap="round"
          />
        </symbol>
      </defs>
      <g transform="translate(-3.4341 -3.2487)">
        <ellipse cx="26.192" cy="39.741" rx="18.918" ry="4.7625" fill="#797979" style="paint-order:normal"/>
        <use 
          id="use-circle"
          xlink:href="#circle" x="1" y="3" width="40" height="40" 
        />
        <g fill="none">
          <path
            d="m32.916 12.171c14.214-14.609 19.554-3.3283 21.825 7.1139 2.0639 9.4925 1.0079 22.077-8.5319 21.473-8.5222-0.53926-2.1856 16.831-22.736 7.7788"
            stroke="#ddd" stroke-linecap="round" stroke-width="4"
          />
          <path
            id="use-star2"
            d="m27.528 55.489-4.2238-2.8698-4.7587 1.8526 1.4241-4.9039-3.2324-3.9533 5.104-0.16098 2.7609-4.2958 1.7303 4.8045 4.9387 1.2983-4.0346 3.1303z"
            stroke="#ff6200" stroke-linecap="round" stroke-width="2.2"
          />
        </g>
        <path
          id="use-star1"
          d="m28.343 50.964-3.4303-0.0178-1.9594 2.8157-1.0431-3.2679-3.2834-0.99336 2.7857-2.0019-0.06988-3.4297 2.7647 2.0307 3.2402-1.1263-1.077 3.2569z"
          fill="#ffbc00"
        />
      </g>
    </svg>

    <h2>Now Loading...</h2>
  </div>
</template>

<script>
export default {
  template: '<loading>',
  props: [
    'loading'
  ],
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #202020;
  text-align: center;
  padding-top: 200px;
}
#use-circle {
  animation: spin 2s linear infinite;
  transform-origin: 21px 23px;
}
#use-star1, #use-star2 {
  transform-box: fill-box;
  transform-origin: center;
}
#use-star1 {
  animation: change-size 0.3s linear infinite;
}
#use-star2 {
  animation: change-size 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
}
@keyframes change-size {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
