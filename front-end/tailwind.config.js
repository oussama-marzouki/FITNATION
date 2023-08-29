/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    colors:{
      principal : '#FFC800' ,
      redc : '#FF0000' , 
      white : '#ffffff',
      black : '#000000' ,
      gray : '#B0AFAC' ,
      hei : '25px',  
      green : '#4BB543' ,
    },
    screens: {
      'ss': '300px',
      // => @media (min-width: 640px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'pic': "url('../src/assets/anastas1.png')",
        'test': "url('../src/assets/anastas222.jpg')",
        'macros': "url('../src/assets/macros.png')",
        'diet': "url('../src/assets/diet1.png')",
        'workout': "url('../src/assets/wokrout1.png')",
        'exbg':"url('../src/assets/exbg.png')" ,   
        'footerbg' : "url('../src/assets/Group.png')" , 
        'contact' : "url('../src/assets/contact.png')" ,
        'services' : "url('../src/assets/services.png')", 
        'workoutbg' : "url('../src/assets/workoutbg.png')", 
        'dietplan' : "url('../src/assets/dietplan.png')",
        'wallet' : "url('../src/assets/money1.jpg')",
        'workoutp' : "url('../src/assets/workoutp.jpg')",
        'dietp' : "url('../src/assets/dietp.jpg')",
        'bgc' : "url('../src/assets/bgc.png')",
        'clientw' : "url('../src/assets/clientW.png')",
        'clientd' : "url('../src/assets/dietbg.jpg')",
        'adminb' : "url('../src/assets/adminba.jpg')",
        'bgadmin' : "url('../src/assets/adminbac.jpg')",
        'bgbg' : "url('../src/assets/bgbg.jpg')",
      },

      fontFamily: {
        'poppins': ['Poppins'],
     }
    },
  },
  plugins: [],
}
