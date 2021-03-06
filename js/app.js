// Script Vue.JS
const app = Vue.createApp({
  mounted() {
    this.returnNoteList();
  },
  data: function () {
    return {
      id: 0,
      description: "",
      listOfNote: [],
    };
  },
  methods: {
    /**
     * Cette fonction permet de mettre à jour le local storage
     *
     * @param {Array} arrayOfNote
     */
    setItemLocalStorage(arrayOfNote) {
      localStorage.setItem("listNotes", JSON.stringify(arrayOfNote));
    },

    /**
     * Cette fonction permet de retourner l'intégralité des notes
     * @returns Array de l'ensemble des notes
     */
    returnNoteList() {
      // On instancie un array par défaut si on ne trouve pas de liste
      if (this.getLocalNoteList() == null)
        this.setItemLocalStorage([
          { id: 1634799994263, text: "Une note" },
          { id: 1634799994264, text: "Une autre note" },
        ]);

      // On récupére l'intégralité de nos notes
      this.listOfNote = this.getLocalNoteList();

      // on met en premier la note la plus récente
      this.listOfNote.sort((a, b) => b.id - a.id);

      // On retourne notre liste
      return this.listOfNote;
    },

    /**
     * Cette fonction permet de récupérer notre tableau de notes stockées
     * dans le local storage
     *
     * @returns Array des notes
     */
    getLocalNoteList() {
      const listOfNotes = JSON.parse(localStorage.getItem("listNotes"));
      return listOfNotes;
    },

    /**
     * Cette fonction permet d'ajouter une nouvelle notes à notre
     * liste de notes
     *
     * @returns Nouvelle note
     */
    addToListOfNote() {
      let newNoteList = this.returnNoteList();
      console.log(this.description);
      newNoteList.push(this.newNote(this.description));

      localStorage.setItem("listNotes", JSON.stringify(newNoteList));
      this.listOfNote = newNoteList;
      return newNoteList;
    },

    /**
     * Cette fonction va supprimer une note puis mettre à jour
     * la liste de notes
     * @param {int} id
     */
    deleteANote(id) {
      let noteToNotPop = [];
      this.listOfNote.forEach((note) => {
        if (note.id !== id) {
          noteToNotPop.push(note);
        }
      });

      this.listOfNote = noteToNotPop;
      this.setItemLocalStorage(this.listOfNote);
    },

    /**
     * Cette fonction permet de coupé notre chaîne de caractère
     * @param {string} value
     * @param {int} limit
     * @returns Chaîne de caractère coupé
     */
    returnTruncateString(value, limit) {
      if (!value) {
        return;
      }

      if (value.length < limit) {
        return value;
      }
      const valueToReturn = value.substring(0, limit) + "...";
      return valueToReturn;
    },

    /**
     * Cette fonction retourne le nombres de mots dans une chaîne
     * de caractère
     *
     * @param {string} value
     * @returns Entier correspondant aux nombres de mots
     */
    returnCountOfWord(value) {
      if (!value) {
        return;
      }

      const numberWord = value.split(" ").length;
      return numberWord;
    },

    /**
     * Cette fonction permet d'ouvrir le modal afin d'effectuer
     * une modification ou une suppression
     * @param {int} id
     */
    openModalEdit(id) {
      this.listOfNote.forEach((note) => {
        if (note.id === id) {
          this.description = note.text;
          this.id = note.id;
        }
      });

      if (this.id === 0) {
        this.description = `Erreur lors de l\'affichage de cette note (id = ${id})`;
      } else {
        console.log(this.description);
        $("#modal_edit_note").modal("open");
      }
    },

    /**
     * Cette fonction permet de mettre à jour une note,
     * elle va par la suite remettre à vide les variables
     * id et description
     * @param {bool} update
     */
    updateEditModal(update) {
      if (update) {
        this.listOfNote.forEach((note) => {
          if (note.id === this.id) {
            note.text = this.description;
          }
        });

        this.setItemLocalStorage(this.listOfNote);
      } else {
        this.description = "";
        this.id = 0;
      }
    },

    /**
     * Cette fonction permet de créer une note et de la retourner par la suite
     * @param {string} desc
     * @returns Une note au format attendu
     */
    newNote(desc) {
      return { id: Date.now(), text: desc };
    },
  },
}).mount("#app");
