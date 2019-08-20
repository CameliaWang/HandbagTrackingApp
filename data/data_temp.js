[
'{{repeat(10)}}',
  {
  id:'{{index()}}',
    name:'{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    country: '{{country()}}',
    state: '{{state()}}',
    city: '{{city()}}',
    username:function(){
      return 'user'+this.id;
    },
    password:'pass',
    email:function(){
      return this.username+'@gmail.com';
  },
    img:'https://via.placeholder.com/400/{{integer(700,999)}}/fff',
    bags:[
      '{{repeat(12, 16)}}',
      {
        id:'{{index()}}',
        name:'{{company()}}',
        type:'{{random("bagpackPurse", "baguetteBag", "bucketBag", "hoboBag", "messengerBag", "minaudiereClutch")}}',
        brand:function(tags){
        var brands = {
          bagpackPurse:['Chanel','Chloe','KateSpade', 'Prada', 'Dior', 'Gucci', 'LouisVuitton', 'Valentino', 'Fendi'],
          baguetteBag:['Chloe', 'Dior','DolceGabbana', 'Prada', 'Gucci', 'LouisVuitton'],
          bucketBag:['Chanel','Chloe','KateSpade', 'Prada', 'Dior', 'Valentino', 'Fendi'],          
          hoboBag:['KateSpade', 'Prada', 'Dior','DolceGabbana', 'Gucci', 'Valentino', 'LouisVuitton'],
          messengerBag:['Dior', 'Gucci', 'LouisVuitton', 'Valentino','DolceGabbana', 'Fendi'],
          minaudiereClutch:['Dior', 'Gucci', 'LouisVuitton','DolceGabbana','Chloe','KateSpade', 'Prada'],
          saddleBag:['Chanel','Chloe','KateSpade', 'Prada', 'Dior', 'Gucci', 'Valentino']
        };
          var chosen_brand = brands[this.type];
          var chosen_index = tags.integer(0,chosen_brand.length-1);
          
          return chosen_brand[chosen_index];
       },
        img:function(tags){
          return 'https://via.placeholder.com/400/' + tags.integer(700,999) + '/fff/?text=' + this.name;
        },
        icon:'https://via.placeholder.com/400/{{integer(700,999)}}/fff',
        locations:[
          '{{repeat(8, 12)}}',
          {
            id:'{{index()}}',
            lat:'{{floating(37.758620, 37.538260)}}',
            lng:'{{floating(-122.507905, -122.338741)}}',
            description:'{{lorem(1, "sentences")}}',
            img:'https://via.placeholder.com/300/{{integer(700,999)}}/fff',
            icon:'icon.png'
          }
        ]
      }
    ]
  }
]
