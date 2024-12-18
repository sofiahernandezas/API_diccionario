document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("boton-palabra");
    const result = document.getElementById("resultado");
  
    const getRandomWord = async () => {
      try {
     
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
        if (!response.ok) throw new Error("No se pudo recuperar la palabra.");
        const [randomWord] = await response.json();
  
        
        const definitionResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        if (!definitionResponse.ok) throw new Error("¡Ouch! Definición no encontrada. 💔");
        const data = await definitionResponse.json();
  
        if (!data[0]?.meanings?.length) {
          throw new Error("No hay definiciones disponibles para esta palabra.");
        }
  
        const definitions = data[0].meanings
          .flatMap(meaning => meaning.definitions.map(def => def.definition))
          .slice(0, 3);
  
        // Display the word and its definitions
        result.innerHTML = `
          <h2 class="fst-italic">"${randomWord}"</h2>
          <ul>${definitions.map(def => `<li>${def}</li>`).join("")}</ul>
        `;
      } catch (error) {
        // Handle errors
        result.innerHTML = `
          <p style="color: red;">${error.message}</p>
          <p>¡Intenta hacer clic en el botón nuevamente! 🤞</p>
        `;
      }
    };
  
    // Add the event to the button
    button.addEventListener("click", getRandomWord);
  });
  