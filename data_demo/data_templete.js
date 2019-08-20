[
'{{repeat(8)}}',
  {
  id:'{{index()}}',
    name:'{{firstName()}} {{surname()}}',
    username:function(){
      return 'user'+this.id;
    },
    email:function(){
      return this.username+'@gmail.com';
  },
    password:'pass',
    img:'https://via.placeholder.com/400/{{integer(700,999)}}/fff',
    animals:[
      '{{repeat(5,15)}}',
      {
      id:'{{index()}}',
        name:'{{company()}}',
        type:'{{random("cat", "dog", "horse")}}',
        breed:function(tags){
        var breeds = {
          cat:['Ginger','Shorthair','Siamese'],
          dog:['bijon', 'Shepherd','Bulldog', 'Chihuahua'],
          horse:['White','Black','Andalusian']
        };
          var chosen_breed = breeds[this.type];
          var chosen_index = tags.integer(0,chosen_breed.length-1);
          
          return chosen_breed[chosen_index];
       },
        img:function(tags){
        return 'https://via.placeholder.com/400/' + tags.integer(700,999) + '/fff/?text=' + this.name;
        },
        locations:[
          '{{repeat(5, 15()}}',
          {
            id:'{{index()}}',
            lat:'{{floating(37.758620, 37.538260)}}',
            lng:'{{floating(122.507905, 122.338741)}}',
            description:'{{lorem(2, "paragraphs")}}',
            img:'https://via.placeholder.com/400/{{integer(700,999)}}/fff',
            icon:'icon.png'
          }
        ]
      }
    ]
  }
]