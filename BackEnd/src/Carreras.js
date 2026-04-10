require('dotenv').config();//Carga variables

const mongoose=require('mongoose');
const Carrera=require('./models/careers'); //importa el modelo de carreras

//Función async para ejecutar el seed
async function seedCareers(){
  try {
    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Eliminar carreras existentes
    await Carrera.deleteMany(); 
    console.log('🗑️  Carreras eliminadas');

    // Crear nuevas carreras
    const careerData = [{
  nombre: 'Tec. Calidad y Desarrollo de Software',

  anios: [
    {
      anio: 1,
      materias: [
        { nombre: "Algoritmos y Paradigmas", codigo: "T101" },
        { nombre: "Algebra 1", codigo: "T102" },
        { nombre: "Ingles A1", codigo: "T103" },
        { nombre: "Formacion Humanistica 1", codigo: "T104" },
        { nombre: "Desarrollo de Software", codigo: "T105" },
        { nombre: "Gestión de RRHH", codigo: "T106" },
        { nombre: "Bases de Datos", codigo: "T107" },
        { nombre: "Álgebra II", codigo: "T108" },
        { nombre: "Seminario Informatico 1", codigo: "T109" }
      ]
    },

    {
      anio: 2,
      materias: [
        { nombre: "Ingles A2", codigo: "T201" },
        { nombre: "Formacion Humanistica 2", codigo: "T202" },
        { nombre: "Fund. del Control de Calidad", codigo: "T203" },
        { nombre: "Seminario Informático II", codigo: "T204" },
        { nombre: "Desarrollo Front End", codigo: "T205" },
        { nombre: "Control de Calidad Avanzado", codigo: "T206" },
        { nombre: "Seminario Informático III", codigo: "T207" },
        { nombre: "Desarrollo Back End", codigo: "T208" }
      ]
    },

    {
      anio: 3,
      materias: [
        { nombre: "Ingles B1", codigo: "T301" },
        { nombre: "Desarrollo de Aplic. Web", codigo: "T302" },
        { nombre: "Testeo Automatizado", codigo: "T303" },
        { nombre: "Proyecto Final", codigo: "T304" }
      ]
    }
  ]

  
    },

    {
        nombre:'Ingenieria en Inteligencia Artificial',

        anios: [
       {
          anio: 1,
          materias: [
            { nombre: "Matematica 1", codigo: "I101" },
            { nombre: "Algebra Lineal", codigo: "I102" },
            { nombre: "Estructura de datos y programación 1", codigo: "I103" },
            { nombre: "Formación Humanística I-1", codigo: "I104" },
            { nombre: "Matemática II", codigo: "I105" },
            { nombre: "Fundamentos de Inteligencia Artificial", codigo: "I106" },
            { nombre: "Física I", codigo: "I107" },
            { nombre: "Formación Humanística I-2", codigo: "I108" },
            { nombre: "Sistemas de Representación", codigo: "I109" },
            { nombre: "Estructura de datos y programación 2", codigo: "I110" },
            { nombre: "Taller I", codigo: "I111" }
          ]
        },

        {
          anio: 2,
          materias: [
            { nombre: "Matematica III", codigo: "I201" },
            {nombre:"Física II", codigo: "I202"},
            {nombre:"Sistemas Digitales", codigo: "I203"},
            {nombre:"Formación Humanística II-1", codigo: "I204"},
            {nombre:"Probabilidades y Estadística", codigo: "I205"},
            {nombre:"Formación Humanística II-2", codigo: "I206"},
            {nombre:"Química General", codigo: "I207"},
            {nombre:"Taller II", codigo: "I208"},
            {nombre:"Física III", codigo: "I209"},
            {nombre:"Matemática IV", codigo: "I210"},

          ]
       },

       {
        anio: 3,
        materias: [
          {nombre:"Arquitectura de computadores", codigo: "I301"},
          {nombre:"Bases de datos", codigo: "I302"},
          {nombre:"Métodos Numéricos", codigo: "I303"},
          {nombre:"Formación Humanística III-1", codigo: "I304"},
          {nombre:"Ingeniería de software 1", codigo: "I305"},
          {nombre:"Fundamentos de Ciencia de Datos ( Data Science)", codigo: "I306"},
          {nombre:"Gestión de grandes datos (Big Data)", codigo: "I307"},
          {nombre:"Ingeniería de software 2", codigo: "I308"},
          {nombre:"Formación Humanística III-2", codigo: "I309"},
          {nombre:"Taller III", codigo: "I310"}

        ]
       },

       {
        anio: 4,
        materias: [
          {nombre:"Visión computacional", codigo: "I401"},
          {nombre:"Redes Neuronales", codigo: "I402"},
          {nombre:"Procesamiento del lenguaje natural", codigo: "I403"},
          {nombre:"Formación Humanística IV-1", codigo: "I404"},
          {nombre:"Bioinformática 1", codigo: "I405"},
          {nombre:"Aprendizaje de máquina (Machine learning)", codigo: "I406"},
          {nombre:"Aprendizaje por refuerzo ", codigo: "I407"},
          {nombre:"Ingeniería de características", codigo: "I408"},
          {nombre:"Formación Humanística IV-2", codigo: "I409"},
          {nombre:"Bioinformática 2", codigo: "I410"},
          {nombre:"Taller IV", codigo: "I411"}
        ]
       }, 

       {
        anio: 5,
        materias: [
          {nombre:"Fundamentos de economía y finanzas", codigo: "I501"},
          {nombre:"Ciberseguridad", codigo: "I502"},
          {nombre:"Seminario: Medioambiente, Higiene y Seguridad Laboral", codigo: "I503"},
          {nombre:"Seminario Humanístico I", codigo: "I504"},
          {nombre:"Seminario de Inteligencia Artificial I", codigo: "I505"},
          {nombre:"Legislación", codigo: "I506"},
          {nombre:"Organización empresarial", codigo: "I507"},
          {nombre:"Seminario Humanístico II", codigo: "I508"},
          {nombre:"Seminario de Inteligencia Artificial II", codigo: "I509"},
          {nombre:"Proyecto Final Integrador", codigo: "I510"},
          {nombre:"PPS (Práctica Profesional Supervisada)", codigo: "I511"},

        ]
       }
      ]
    }
    ];

    // Insertar carreras en la BD
    const resultado = await Carrera.insertMany(careerData);
    console.log(`✅ ${resultado.length} carreras insertadas`);

    // Mostrar carreras insertadas
    console.log('\n📚 Carreras insertadas:');
    resultado.forEach((carrera, index) => {
      console.log(`${index + 1}. ${carrera.nombre}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Conexión cerrada');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar el seed si este archivo se llama directamente
if (require.main === module) {
  seedCareers();
}
 