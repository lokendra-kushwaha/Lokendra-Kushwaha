// ==========================================
// Research Logs Data
// ==========================================
const researchLogs = [
    {
        id: "LOG_001",
        date: "22.09.2026",
        title: "Building an AI Math Engine from Scratch: The Physics of Matrices and the Hardware Memory Trap",
        content: `
            <p>I have never liked limitations. My journey into AI engineering is not just driven by a love for mathematics—it is driven by an obsession with understanding systems at their absolute core and maintaining complete control over the logic.</p>

            <p>When I started coding, I did not want to just import a pre-built library to do the heavy lifting. I wanted to translate my own notebook derivations into raw code to execute the massive calculations I could not do by hand. This led me to build a complete custom Linear Algebra engine comprising roughly 45,000 lines of pure Python logic, completely independent of external libraries like NumPy.</p>

            <p>What started as an exercise in mathematics quickly turned into a deep dive into computer hardware, memory architectures, and the true physics of data processing. Here is what I learned.</p>

            <h3>The Lie We Were Taught About Matrices</h3>
            <p>In high school, textbooks taught us that a matrix is simply a grid of numbers used to store or organize data. But when you build AI architectures from scratch, you realize that is only a fraction of the truth.</p>
            <p>In Machine Learning, a matrix is NOT just static data. <strong>It is an Action Box.</strong></p>
            <p>It gives data a completely new definition. When a matrix interacts with a vector, it acts as a force of transformation. It physically manipulates that vector in space—rotating its direction, stretching its magnitude, or squashing it into entirely new dimensions. Before writing a single line of Python, I went back to my notebook, took a standard 3D vector, and multiplied it by a 3x3 transformation matrix. The matrix acted as a physical force, perfectly flipping the vector's direction 180 degrees in 3D space.</p>

            <h3>What Happens When Two Matrices Collide?</h3>
            <p>If a single matrix is an "Action Box," what happens when two of these boxes crash into each other? Matrix operations are essentially the fusion of actions.</p>
            <p>When two matrices multiply, they don't just crunch numbers. If Matrix A rotates a vector by 90 degrees, and Matrix B stretches it by 2x, multiplying them creates a brand new unified Matrix. This new matrix inherits the properties of both parents, simultaneously rotating and stretching any vector it touches in space.</p>
            <p>Conversely, when two exactly opposite actions collide—like adding a transformation matrix to its exact negative counterpart—they completely cancel each other out, creating a "Zero Matrix." A Zero Matrix destroys the vector, collapsing its magnitude and direction into absolute nothingness.</p>

            <h3>The 150-Second Reality Check: Python vs. C</h3>
            <p>After mapping out the logic, I benchmarked my custom pure Python matrix operations against the industry standard (NumPy) on a massive 1000x1000 matrix. The results were humbling, but exactly what I expected.</p>

            <!-- Neon Code Box for Benchmarks -->
            <div class="code-box">
                <pre><code>Benchmark Results (1000x1000 Matrix Multiplication):
> NumPy Multiplication: 1.64 seconds
> Custom Python Engine: 150.91 seconds</code></pre>
            </div>

            <p>Why did my pure Python code take 150 seconds while NumPy did it in under 2? It has nothing to do with writing "better" Python loops. It is entirely about how a computer reads memory at the silicon level.</p>

            <h3>The Memory Architecture Breakdown</h3>
            <p>If you are just writing code, you see a matrix. If you look deeper, you see physical memory grids.</p>
            <ul>
                <li><strong>1. The Memory Gap (Contiguous vs. Referential):</strong> NumPy uses under-the-hood C arrays, storing data in contiguous memory blocks. My custom engine relies on standard Python lists. A Python list is not a true array; it is a referential array of pointers. The actual data items are scattered randomly across the RAM.</li>
                <li><strong>2. Hardware-Level Parallelism (SIMD):</strong> Because NumPy’s data is contiguous, it can bypass Python entirely and send instructions straight to the C engine. The CPU can then use SIMD to grab 8 to 16 items at once and process them in parallel. Since my Python lists store scattered pointers, the CPU cannot predict the next memory address, making SIMD physically impossible.</li>
                <li><strong>3. The GIL Bottleneck:</strong> Python has the Global Interpreter Lock (GIL). When iterating sequentially through my custom matrix, the CPU has to fetch a pointer, lock the interpreter, process the item, unlock it, and then find the next pointer. It is a severe bottleneck.</li>
            </ul>

            <h3>The Great axis=0 Trap & Cache Locality</h3>
            <p>In RAM, data is inherently flat.</p>
            <ul>
                <li><strong>C-Order (Row-Major):</strong> NumPy's default. Row data is stored side-by-side contiguously.</li>
                <li><strong>F-Order (Column-Major):</strong> Column data is stored contiguously.</li>
            </ul>
            <p>The hardware rule is that the CPU never fetches a single number. It fetches a full 64-Byte "Cache Line". If the next number you need is in that same chunk, you get an ultra-fast Cache Hit. If it is far away down a column, you get a Cache Miss, and execution speed drops by 10x.</p>
            <p>I ran an experiment summing a matrix down its columns (axis=0). Logically, F-Order should be faster because columns are contiguous. Instead, C-Order was 5x faster. Why? Because the C-Order operation fetched entire rows into the CPU's L1 Cache and added them in parallel using SIMD magic. F-Order, however, suffered a "Reduction Penalty."</p>

            <h3>The Transpose Illusion</h3>
            <p>This brings us to the danger of transposing matrices. When you transpose a C-Order matrix (.T), NumPy does NOT create new data in RAM. It simply reverses the pointers (Strides), turning it into an F-Order view. Unaware of this, developers often run misaligned operations on transposed matrices and inadvertently crash their CPU performance.</p>

            <h3>The Matrix Multiplication Paradox & BLAS</h3>
            <p>A mathematical dot product multiplies the Row of Matrix A with the Column of Matrix B. As an architect, my hypothesis was that a C-Order matrix multiplied by an F-Order matrix (C * F) should be the absolute fastest. In raw C++ with nested loops, this is true.</p>
            <p>But my live 1000x1000 benchmark showed C*C, C*F, F*C, and F*F all ran in identical time (~0.015 seconds). How is this possible?</p>
            <p>NumPy's np.dot does not use naive loops. It offloads calculations to BLAS (Basic Linear Algebra Subprograms). BLAS completely bypasses your raw memory layouts using two advanced techniques:</p>
            <ul>
                <li><strong>Block Tiling:</strong> It chops the matrices into tiny square blocks (e.g., 64x64) that fit perfectly inside the CPU's ultra-fast L1 Cache.</li>
                <li><strong>Memory Packing:</strong> Microseconds before calculating, it dynamically copies and rearranges these tiny blocks into its own custom contiguous format.</li>
            </ul>
            
            <br>
            <p><em>Building a math engine from scratch and watching it get crushed by NumPy is a rite of passage. It forces you to look past the syntax and understand what is actually happening at the silicon level. True engineering is not just knowing how to import a library—it is understanding how hardware processes your data. If you do not understand how your data sits in the RAM, you do not truly understand your AI architecture.</em></p>
        `
    },

    {
        id: "LOG_002",
        date: "01.10.2026",
        title: "Unveiling the Pandas Black Box: The Ultimate System Engineer's Guide to Memory, Architecture, and Performance",
        content: (function() {
            var L = String.fromCharCode(60);
            var G = String.fromCharCode(62);
            function tag(t, s) { return L + t + G + s + L + "/" + t + G; }
            function p(s) { return tag("p", s); }
            function h3(s) { return tag("h3", s); }
            function b(s) { return tag("strong", s); }
            function em(s) { return tag("em", s); }
            function codeBox(s) {
                return L + 'div class="code-box"' + G + tag("pre", tag("code", s)) + L + "/div" + G;
            }
            function ul(arr) {
                return tag("ul", arr.map(function(item) { return tag("li", item); }).join(""));
            }

            return [
                p("If you have spent more than a week in Data Science, you have used Pandas. It is the undisputed king of data manipulation in Python. We all know how to use pd.read_csv(), df.groupby(), and df.dropna()."),

                p("But here is the hard truth: " + b("99% of data analysts treat Pandas as a magical black box.")),

                p("When your dataset grows from 10,000 rows to 10 Million rows, treating Pandas like a simple spreadsheet stops working. Your code crashes, your RAM gets maxed out, and you are hit with the dreaded SettingWithCopyWarning without understanding why."),

                p("To write truly optimized code, we need to stop looking at Pandas as just an analysis tool and start looking at it as a " + b("Memory Manager.") + " In this massive deep-dive, we are going to tear apart the Pandas architecture, understand how it talks to your CPU, and uncover the engineering secrets hidden beneath the surface."),

                h3("Chapter 1: The DataFrame Illusion & The Lego Brick Architecture"),

                p("When you type print(df), your console prints a beautiful 2D table with rows and columns. But what is actually happening inside your RAM?"),

                p("A DataFrame does not exist as a massive 2D matrix in memory. It is a clever architectural illusion designed for human readability. Fundamentally, " + b("a DataFrame is nothing more than a Python Dictionary of 1D Series.") + " If the DataFrame is the wall, the Series is the Lego brick."),

                p(b("The Engine Underneath:") + " Why does Pandas break everything down into 1D columns? Because of the engine running underneath: " + b("NumPy.") + " A Pandas Series is just a wrapper—a \"car body\" built around a pure NumPy ndarray (C-Array) \"engine\"."),

                p("C-Arrays are strictly 1D and require homogeneous data (all integers, or all floats). Why? To utilize " + b("SIMD (Single Instruction, Multiple Data).") + " SIMD is a hardware-level execution model that allows your CPU to perform mathematical operations on thousands of data points simultaneously rather than looping through them one by one."),

                p("By keeping columns isolated as individual 1D C-Arrays, Pandas ensures that calculating the mean of the Salary column executes at raw, blistering C-speed, completely untouched by the text data in the adjacent Name column."),

                h3("Chapter 2: The Dictionary Parsing Paradox & Metadata"),

                p("How Pandas handles raw Python dictionaries is a masterclass in software design. It reacts completely differently based on what you are trying to build."),

                ul([
                    b("1. The Series Paradox: ") + "If you try to pass a dictionary to a Series: pd.Series({'Age': [25, 30, 22]}), it results in a disaster. Pandas assumes the entire list [25, 30, 22] is a single entity and crams it into one row. The C-Array is broken, and SIMD is dead.",
                    b("2. The DataFrame Magic: ") + "When you pass that exact same dictionary to a DataFrame, it maps the Key ('Age') as the Column Name and spreads the list vertically."
                ]),

                p("But here is the secret: The C-Array underneath has no concept of Column Names. It only stores raw numbers. So where does the column name come from?"),

                p(b("It is the Metadata.") + " Pandas attaches the dictionary key as the name attribute of the Series. When the DataFrame groups these Series together, it simply reads their name metadata to render the column headers on your screen."),

                h3("Chapter 3: The Pointer Hack & Type Coercion"),

                p("If C-Arrays strictly require homogeneous data to maintain their SIMD speed, what happens when you introduce messy, real-world data into a single array? What if we pass [1, \"Hello\", 3.14]?"),

                p("NumPy and Pandas have two entirely different philosophies for handling this."),

                ul([
                    b("A. NumPy's Approach — Type Coercion (Upcasting): ") + "NumPy is obsessed with keeping its C-Array contiguous in memory. If it sees mixed types, it initiates Upcasting. It looks for the most complex data type (Strings) and forces everything into it. 1 becomes \"1\" and 3.14 becomes \"3.14\". " + b("The Result:") + " The array stays contiguous in RAM (using the U32 string dtype), but mathematical operations like .sum() now fail completely (The \"1\" + \"3.14\" String Failure).",
                    b("B. Pandas' Approach — The Pointer Hack (object dtype): ") + "Pandas cannot afford to lose data integrity. Instead of forcing numbers into strings, it applies the Pointer Hack. When given mixed data or pure text (like 'Apple', 'Banana'), Pandas assigns the object dtype. Inside the C-Array, it does not store the actual data. Instead, it stores " + b("8-byte Memory Addresses (Pointers)") + " that point to the actual Python objects scattered randomly across the Heap RAM."
                ]),

                codeBox(
                    "Memory Architecture Breakdown (Input: [1, \"Hello\", 3.14]):\n" +
                    "> NumPy Upcasting (U32) : [\"1\", \"Hello\", \"3.14\"]   // Contiguous RAM, Math Broken\n" +
                    "> Pandas Pointer Hack   : [0x7f8a10, 0x7f9b40, 0x7fc090] // 8-Byte Pointers -> Heap RAM"
                ),

                p(b("The Trade-off?") + " You keep true data types (integers remain integers, strings remain strings), but SIMD is completely broken and extra memory is consumed because the CPU must chase pointers across scattered RAM locations."),

                h3("Chapter 4: The Hybrid Index Engine (Dict + Array)"),

                p("How does Pandas give you the O(1) Lookup Speed of a Dictionary and the Mathematical Power of an Array at the same time? Because a Series is a " + b("Hybrid Object") + " running two internal engines side-by-side:"),

                ul([
                    b("1. The C-Array (series.values): ") + "Stores the raw data in a contiguous block of memory.",
                    b("2. The Hash Map (series.index): ") + "Stores the index labels. By default, Pandas uses a RangeIndex(0, stop, step) which takes zero extra memory. However, when you assign custom labels (e.g., Dates in Time-Series like '2026-09-18'), Pandas builds a pure Hash Map."
                ]),

                p(b("The Two-Step Execution:") + " When you request data using '2026-09-18', Pandas passes the label to the Hash Map (Step 1), translates it into an integer memory position in O(1) time, and fetches the value directly from the C-Array (Step 2)."),

                p(b("Resolving The Ultimate Ambiguity (.loc vs .iloc):") + " What happens when a developer creates custom integer labels (e.g., 1, 5, 10) instead of standard positions (0, 1, 2...)? If you type series[1], Pandas panics. Does the developer mean Label 1 or Index Position 1? To eliminate this ambiguity, Pandas provides two strict operators:"),

                ul([
                    b("A. .loc (Label Location): ") + "Strictly searches the Hash Map for exact index labels.",
                    b("B. .iloc (Integer Location): ") + "Ignores labels completely; strictly calculates C-Array integer memory positions."
                ]),

                h3("Chapter 5: Stride Mathematics — Views vs. Copies"),

                p("How does a C-Array jump to the 5 Millionth row instantly in O(1) time without looping through the previous rows? The secret boils down to " + b("Stride Mathematics.")),

                p("Since every element in a C-Array has a fixed, predictable size (e.g., 8 bytes for a 64-bit float), the CPU calculates the exact memory address using a simple mathematical formula:"),

                codeBox(
                    "Hardware Stride Formula (O(1) Instant Memory Jump):\n" +
                    "> Address = Base_Address + (Index * Item_Size_In_Bytes)"
                ),

                p("This stride formula is the reason behind Pandas' dual memory behavior: " + b("Views vs. Copies.")),

                ul([
                    b("1. Slicing Creates a VIEW (Zero Extra Memory): ") + "When you slice data sequentially (series[1:6:2]), the jump pattern is constant and predictable. Pandas does not copy the data. It simply creates a \"window\" (View) over the original C-Array by multiplying the stride step. It is incredibly fast and memory-efficient.",
                    b("2. Fancy Indexing Creates a COPY: ") + "What if you request random, non-sequential rows like series[[0, 5, 2]]? There is no mathematical stride pattern. The stride formula breaks down. Pandas panics and is forced to allocate a brand-new, empty C-Array elsewhere in RAM and manually copy those requested values into it."
                ]),

                h3("Chapter 6: The Infamous SettingWithCopyWarning"),

                p("Understanding Views and Copies solves the most dangerous trap in Pandas. When you filter a DataFrame (df[df['Age'] > 25]), you are asking for random, non-sequential rows. This is " + b("Fancy Indexing.") + " Pandas creates a " + b("Copy in RAM.")),

                p("If you try to edit this filtered result directly, Pandas screams at you with SettingWithCopyWarning. Why? Because you are only modifying the isolated copy. Your original DataFrame remains completely untouched, leading to catastrophic logic errors in production pipelines."),

                h3("Conclusion: Stop Coding, Start Engineering"),

                p("Pandas is not magic; it is an incredible feat of software engineering built on top of C and Python."),

                p("Once you understand that DataFrames are dictionaries of 1D arrays, that object dtypes are just arrays of 8-byte pointers, that fetching requires Hash Maps, and that filtering data breaks Stride mathematics to create memory copies—you stop being a passive user of the library."),

                L + "br" + G,

                p(em("You become a system engineer who can write Pandas code that scales to billions of rows without breaking a sweat. Next time you type import pandas as pd, remember: you are not just making a table. You are orchestrating CPU cycles, Hash Maps, and RAM allocations. Code accordingly."))
            ].join("\n");
        })()
    }
];

// Rendering Logic & Quick Navigation Builder
const container = document.getElementById('logs-container');
const indexContainer = document.getElementById('logs-index');

if (container && indexContainer) {
    let indexHTML = `<h3>>_ QUICK_NAVIGATION</h3><ul>`;

    researchLogs.forEach(log => {
        indexHTML += `<li><a href="#${log.id}">[${log.id}] - ${log.title}</a></li>`;

        const article = document.createElement('article');
        article.classList.add('log-card');
        article.id = log.id;

        article.innerHTML = `
            <div class="log-header">
                <span class="log-id"><i class="fas fa-terminal"></i> ${log.id}</span>
                <span class="log-date">// ${log.date}</span>
            </div>
            <h2 class="log-title">${log.title}</h2>
            <div class="log-body">
                ${log.content}
            </div>
        `;
        container.appendChild(article);
    });

    indexHTML += `</ul>`;
    indexContainer.innerHTML = indexHTML;
}

// 1. Top Reading Progress Bar
const progressBar = document.createElement('div');
progressBar.id = 'reading-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
});

// 2. Auto-Inject Copy Buttons into Code Boxes
function initCopyButtons() {
    const codeBoxes = document.querySelectorAll('.code-box');
    codeBoxes.forEach((box) => {
        if (box.querySelector('.copy-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerText = 'COPY';

        btn.addEventListener('click', () => {
            const pre = box.querySelector('pre');
            const codeText = pre ? pre.innerText : box.innerText;

            navigator.clipboard.writeText(codeText).then(() => {
                btn.innerText = 'COPIED!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerText = 'COPY';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });

        box.appendChild(btn);
    });
}

initCopyButtons();
window.addEventListener('DOMContentLoaded', initCopyButtons);

// 4. Auto Read-Time & AI Voice Reader for Research Logs
function initLogVoiceReader() {
    const logBoxes = document.querySelectorAll('[id^="LOG_"], article, .log-card, .log-box');

    logBoxes.forEach((logBox) => {
        if (logBox.querySelector('.log-tools-bar')) return;

        const titleEl = logBox.querySelector('h2') || logBox.querySelector('h3');
        if (!titleEl) return;

        // Collect all readable text blocks (skipping code boxes)
        const readableBlocks = Array.from(logBox.querySelectorAll('h2, h3, p, li')).filter(
            (el) => !el.closest('.code-box') && el.innerText.trim().length > 0
        );

        const fullText = readableBlocks.map((el) => el.innerText.trim()).join(' ');
        const wordCount = fullText.split(/\s+/).filter(Boolean).length;
        const readMinutes = Math.max(1, Math.ceil(wordCount / 190));

        // Create Tools Bar
        const toolsBar = document.createElement('div');
        toolsBar.className = 'log-tools-bar';

        const timeBadge = document.createElement('span');
        timeBadge.className = 'read-time-badge';
        timeBadge.textContent = '[ TIME: ~' + readMinutes + ' MIN READ // ' + wordCount + ' WORDS ]';

        const playBtn = document.createElement('button');
        playBtn.className = 'audio-btn';
        playBtn.textContent = '▶ LISTEN_LOG';

        const stopBtn = document.createElement('button');
        stopBtn.className = 'audio-stop-btn';
        stopBtn.textContent = '⏹ STOP';

        toolsBar.appendChild(timeBadge);
        toolsBar.appendChild(playBtn);
        toolsBar.appendChild(stopBtn);

        titleEl.insertAdjacentElement('afterend', toolsBar);

        // Speech Synthesis Engine (Paragraph-by-Paragraph to avoid cutoff)
        let currentIdx = 0;
        let isSpeaking = false;
        let isPaused = false;

        function clearHighlights() {
            readableBlocks.forEach((el) => el.classList.remove('speaking-active'));
        }

        function resetAudioUI() {
            isSpeaking = false;
            isPaused = false;
            currentIdx = 0;
            playBtn.textContent = '▶ LISTEN_LOG';
            playBtn.classList.remove('playing');
            stopBtn.style.display = 'none';
            clearHighlights();
        }

        function speakBlock(index) {
            if (index >= readableBlocks.length) {
                resetAudioUI();
                return;
            }

            clearHighlights();
            const block = readableBlocks[index];
            block.classList.add('speaking-active');

            const utterance = new SpeechSynthesisUtterance(block.innerText.trim());
            utterance.rate = 1.0;
            utterance.pitch = 0.95;

            utterance.onend = () => {
                if (isSpeaking && !isPaused) {
                    currentIdx++;
                    speakBlock(currentIdx);
                }
            };

            utterance.onerror = () => {
                if (isSpeaking && !isPaused) {
                    resetAudioUI();
                }
            };

            window.speechSynthesis.speak(utterance);
        }

        playBtn.addEventListener('click', () => {
            if (!('speechSynthesis' in window)) {
                alert('Speech synthesis is not supported in this browser.');
                return;
            }

            if (!isSpeaking) {
                window.speechSynthesis.cancel();
                isSpeaking = true;
                isPaused = false;
                currentIdx = 0;
                playBtn.textContent = '⏸ PAUSE_AUDIO';
                playBtn.classList.add('playing');
                stopBtn.style.display = 'inline-block';
                speakBlock(currentIdx);
            } else if (!isPaused) {
                window.speechSynthesis.pause();
                isPaused = true;
                playBtn.textContent = '▶ RESUME_AUDIO';
            } else {
                window.speechSynthesis.resume();
                isPaused = false;
                playBtn.textContent = '⏸ PAUSE_AUDIO';
            }
        });

        stopBtn.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            resetAudioUI();
        });
    });
}

initLogVoiceReader();
window.addEventListener('DOMContentLoaded', initLogVoiceReader);
window.addEventListener('beforeunload', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
});

// =========================================================
// SMART MOUSE SCROLL FOR TAGS & FILTER BARS (HOVER + WHEEL)
// =========================================================
(function initSmartHorizontalScroll() {
    function findScrollableBar(target) {
        let el = target;
        while (el && el !== document.body && el !== document.documentElement) {
            const style = window.getComputedStyle(el);
            if (
                (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
                el.scrollWidth > el.clientWidth + 2
            ) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }

    // 1. Mouse Wheel -> Horizontal Scroll
    document.addEventListener('wheel', function(e) {
        const bar = findScrollableBar(e.target);
        if (bar) {
            e.preventDefault();
            bar.scrollLeft += (e.deltaY !== 0 ? e.deltaY : e.deltaX);
        }
    }, { passive: false });

    // 2. Cursor Move (Hover Auto-Pan Without Clicking!)
    document.addEventListener('mousemove', function(e) {
        const bar = findScrollableBar(e.target);
        if (!bar || bar.classList.contains('cyber-filter-bar')) return;

        const rect = bar.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
        const maxScroll = bar.scrollWidth - bar.clientWidth;

        // Smoothly glide tags left/right just by moving the cursor across the bar
        bar.scrollLeft = ratio * maxScroll;
    });
})();