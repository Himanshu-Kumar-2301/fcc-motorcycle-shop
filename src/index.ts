type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

interface Motorcycle {
    id: string;
    name: string;
    manufacturer: string;
    category: Category;
    price: number;
    image_url: string;
    created_at: Date;
    description: string;
    year: number;
}

const fetchMotorcycles = async (): Promise<Motorcycle[]> => {
    const res = await fetch('https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json');
    const data = await res.json();

    return data.map((m:any) => ({...m, created_at: new Date(m.created_at)}))
}

const renderMotorCycleCard = (motorcycle: Motorcycle) => {
    return `
    <div>
        <img class="motorcycle-card-image-container" src="${motorcycle.image_url}" />
        <p class="motorcycle-card-year-badge">${motorcycle.created_at}</p>
        <h2 class="motorcycle-card-title" >${motorcycle.name}</h2>
        <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
        <p class="motorcycle-card-category">${motorcycle.category}</p>
        <p class="motorcycle-card-description">${motorcycle.description}</p>
        <p class="motorcycle-card-price">${motorcycle.price}</p>
        <p class="motorcycle-card-engine">${motorcycle.description}</p>
    </div>
    `;
}

class MotorcycleGalleryApp {
    allMotorcycles: Motorcycle[] = [];

    constructor() {
        this.init();
    }

    async init() {
        this.allMotorcycles = await fetchMotorcycles();
        this.renderMotorcycles();
    }

    renderMotorcycles() {
        const motorcycleGrid = document.getElementById("motorcycle-grid") as HTMLElement;
        motorcycleGrid.textContent = "";
        this.allMotorcycles.map((motorcycle: Motorcycle) =>{
            motorcycleGrid.textContent += renderMotorCycleCard(motorcycle);
        } );
        const resultNumber = document.getElementById("results-number") as HTMLElement;
        resultNumber.textContent = "" + this.allMotorcycles.length;
    }
}

const motorcycles = new MotorcycleGalleryApp();