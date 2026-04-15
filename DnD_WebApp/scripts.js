const addAttackBtn = document.getElementById("addAttackBtn");
const attackContainer = document.getElementById("attackContainer");
const noteInputs = document.querySelectorAll(".note-input");
const addItemBtn = document.getElementById("addItemBtn");
const inventoryContainer = document.getElementById("inventoryContainer");
const statInputs = document.querySelectorAll(".stat-input");

let attacks = JSON.parse(localStorage.getItem("attacks")) || [];

function saveAttacks() {    //saves user attacks to local storage
  localStorage.setItem("attacks", JSON.stringify(attacks));
}

noteInputs.forEach(function (note) {    //saves note page to local storage
  const key = note.name;

  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    note.value = savedValue;
  }

  note.addEventListener("input", function () {
    localStorage.setItem(key, note.value);
  });
});

//Save stats

statInputs.forEach(function (stat) {
  const key = "stat-" + stat.name;

  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    stat.value = savedValue;
  }

  stat.addEventListener("input", function () {
    localStorage.setItem(key, stat.value);
  });
});

//Attack section

function renderAttacks() {
  attackContainer.innerHTML = "";

  attacks.forEach((attack, index) => {
    const attackCard = document.createElement("div");
    attackCard.className = "attack-card";

    attackCard.innerHTML = `
      <div class="attack-row">
        <div class="attack-field">
          <label>Attack Name</label>
          <input type="text" class="attack-name" value="${attack.name}">
        </div>

        <div class="attack-field">
          <label>Damage Die</label>
          <select class="attack-die">
            <option value="d4" ${attack.die === "d4" ? "selected" : ""}>d4</option>
            <option value="d6" ${attack.die === "d6" ? "selected" : ""}>d6</option>
            <option value="d8" ${attack.die === "d8" ? "selected" : ""}>d8</option>
            <option value="d10" ${attack.die === "d10" ? "selected" : ""}>d10</option>
            <option value="d12" ${attack.die === "d12" ? "selected" : ""}>d12</option>
          </select>
        </div>
      </div>

      <div class="attack-field">
        <label>Description</label>
        <textarea class="attack-description">${attack.description}</textarea>
      </div>

      <button type="button" class="remove-btn">Remove Attack</button>
    `;

    const nameInput = attackCard.querySelector(".attack-name");
    const dieSelect = attackCard.querySelector(".attack-die");
    const descriptionInput = attackCard.querySelector(".attack-description");
    const removeBtn = attackCard.querySelector(".remove-btn");

    nameInput.addEventListener("input", function () {
      attacks[index].name = nameInput.value;
      saveAttacks();
    });

    dieSelect.addEventListener("change", function () {
      attacks[index].die = dieSelect.value;
      saveAttacks();
    });

    descriptionInput.addEventListener("input", function () {
      attacks[index].description = descriptionInput.value;
      saveAttacks();
    });

    removeBtn.addEventListener("click", function () {
      attacks.splice(index, 1);
      saveAttacks();
      renderAttacks();
    });

    attackContainer.appendChild(attackCard);
  });
}

//Inventory section

if (addItemBtn && inventoryContainer) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

  function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }

  function renderInventory() {
    inventoryContainer.innerHTML = "";

    inventory.forEach(function (item, index) {
      const inventoryCard = document.createElement("div");
      inventoryCard.className = "inventory-card";

      inventoryCard.innerHTML = `
        <div class="inventory-row">
          <div class="inventory-field">
            <label>Item Name</label>
            <input type="text" class="item-name" value="${item.name}">
          </div>

          <div class="inventory-field">
            <label>Gold Value</label>
            <input type="number" class="item-gold" value="${item.gold}">
          </div>

          <div class="inventory-field">
            <label>Equipped</label>
            <select class="item-equipped">
              <option value="Equipped" ${item.equipped === "Equipped" ? "selected" : ""}>Equipped</option>
              <option value="Not Equipped" ${item.equipped === "Not Equipped" ? "selected" : ""}>Not Equipped</option>
            </select>
          </div>
        </div>

        <button type="button" class="remove-btn">Remove Item</button>
      `;

      const nameInput = inventoryCard.querySelector(".item-name");
      const goldInput = inventoryCard.querySelector(".item-gold");
      const equippedSelect = inventoryCard.querySelector(".item-equipped");
      const removeBtn = inventoryCard.querySelector(".remove-btn");

      nameInput.addEventListener("input", function () {
        inventory[index].name = nameInput.value;
        saveInventory();
      });

      goldInput.addEventListener("input", function () {
        inventory[index].gold = goldInput.value;
        saveInventory();
      });

      equippedSelect.addEventListener("change", function () {
        inventory[index].equipped = equippedSelect.value;
        saveInventory();
      });

      removeBtn.addEventListener("click", function () {
        inventory.splice(index, 1);
        saveInventory();
        renderInventory();
      });

      inventoryContainer.appendChild(inventoryCard);
    });
  }

  addItemBtn.addEventListener("click", function () {
    inventory.push({
      name: "",
      gold: "",
      equipped: "Not Equipped"
    });

    saveInventory();
    renderInventory();
  });

  renderInventory();
}

addAttackBtn.addEventListener("click", function () {
  attacks.push({
    name: "",
    die: "d6",
    description: ""
  });

  saveAttacks();
  renderAttacks();
});

renderAttacks();