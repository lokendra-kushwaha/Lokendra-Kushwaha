// ==========================================
// Dynamic Projects Data
// ==========================================
const projectsData = [
    {
        id: "PRJ_01",
        title: "The Movie Matrix",
        image: "assets/themoviematrix.png",
        tags: ["Custom Vectorization", "Linear Algebra", "Pure NumPy Logic"],
        description: "Engineered a content-based recommendation system entirely from scratch without relying on Scikit-learn. Developed custom NLP pipelines for text-vectorization and data cleaning using Pandas, and implemented the core matching algorithm through raw manual cosine similarity calculations.",
        liveLink: "https://the-movie-matrix.streamlit.app",
        githubLink: "https://github.com/lokendra-kushwaha/The-Movie-Matrix"
    },
    {
        id: "PRJ_02",
        title: "Neural Optic Core",
        image: "assets/vision.png",
        tags: ["Custom Tensor Object", "Scratch Convolutions", "Core CV Logic"],
        description: "Engineered a custom, dependency-free N-Dimensional tensor engine from scratch—featuring native 3D convolutions, a custom tensor object for advanced logging, and a high-performance dual-engine architecture—powering a production-grade web application for real-time visualization of mathematical feature extraction.",
        liveLink: "#", 
        githubLink: "#"
    },
    {
        id: "PRJ_03",
        title: "The Universe Crawler",
        image: "assets/y.png",
        tags: ["Data Structures", "Pure Logic", "Algorithmic Scaling"],
        description: "Built a fully custom web crawler from scratch. Engineered the core logic using advanced data structures to handle and process massive data nodes efficiently without relying on bloated external libraries.",
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: "PRJ_04",
        title: "Linear Algebra Math Engine",
        image: "images/project2.jpg",
        tags: ["Matrix Physics", "Memory Architecture", "Pure Python"],
        description: "Developed a 45,000-line custom math engine completely independent of NumPy. Handled memory layouts, cache locality, and vector transformations directly at the raw logic level.",
        liveLink: "#",
        githubLink: "#"
    }
];

// Rendering Logic
const projectsContainer = document.getElementById('projects-container');

if (projectsContainer) {
    projectsData.forEach(project => {
        // Tag badges banana
        let tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.classList.add('project-card');

        card.innerHTML = `
            <div class="project-image-box">
                <img src="${project.image}" alt="${project.title}" class="project-img">
            </div>
            <div class="project-content">
                <div class="tags-container">
                    ${tagsHTML}
                </div>
                <h2 class="project-title">${project.title}</h2>
                <p class="project-desc">${project.description}</p>
                
                <div class="project-links">
                    <a href="${project.liveLink}" target="_blank" class="btn-live">
                        <i class="fas fa-external-link-alt"></i> Live Engine
                    </a>
                    <a href="${project.githubLink}" target="_blank" class="btn-github">
                        <i class="fab fa-github"></i> Source Code
                    </a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}