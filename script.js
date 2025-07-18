// Single DOMContentLoaded listener for all functionality
document.addEventListener('DOMContentLoaded', function () {
  // Shared functionality across all pages

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Dark mode toggle functionality
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      showToast(
        document.body.classList.contains('dark-mode') ? 'Dark Mode Enabled' : 'Dark Mode Disabled',
        document.body.classList.contains('dark-mode') ? 'success' : 'info'
      );
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  // FAQ accordion functionality
  const faqCards = document.querySelectorAll('.faq-card');
  if (faqCards.length > 0) {
    faqCards.forEach(card => {
      const question = card.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          card.classList.toggle('active');
        });
      }
    });
  }

  // Toast notification function
  window.showToast = function (message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  };

  // Landing Page Specific
  if (document.querySelector('.landing-page')) {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', function () {
        performSearch(searchInput.value.trim());
      });

      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          performSearch(searchInput.value.trim());
        }
      });
    }

    if (suggestionBtns.length > 0) {
      suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          const term = this.getAttribute('data-term');
          searchInput.value = term;
          performSearch(term);
        });
      });
    }

    function performSearch(term) {
      if (term) {
        sessionStorage.setItem('searchTerm', term);
        window.location.href = 'gallery.html';
      } else {
        searchInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
          searchInput.style.animation = '';
        }, 500);
        showToast('Please enter a search term', 'error');
      }
    }
  }

  // Themes Page Specific
  if (document.querySelector('.themes-page')) {
    const themeCards = document.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
      card.addEventListener('click', function (e) {
        if (!e.target.closest('a')) {
          this.querySelector('.theme-card-inner').classList.toggle('flipped');
        }
      });
    });
  }

  // Gallery Page Specific
  if (document.querySelector('.gallery-page')) {
    // Enhanced image data with unique entries and corrected URLs
    const images = [
      // Mammals
      {
        src: 'images/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.webp',
        category: 'mammals',
        title: 'African Lion',
        species: 'Panthera leo',
        location: 'Serengeti, Tanzania',
        desc: 'The majestic king of the jungle in its natural habitat. Lions are social cats that live in prides.',
        learnMore: 'https://en.wikipedia.org/wiki/Lion',
        premium: false
      },
      {
        src: ' images/pexels-photo-2677849.webp',
        category: 'mammals',
        title: 'African Elephant',
        species: 'Loxodonta africana',
        location: 'Amboseli, Kenya',
        desc: 'The largest land animal on Earth, known for its intelligence and strong social bonds.',
        learnMore: 'https://en.wikipedia.org/wiki/African_elephant',
        premium: false
      },
      {
        src: 'images/portrait-bengal-tiger_136375-1024.webp',
        category: 'mammals',
        title: 'Bengal Tiger',
        species: 'Panthera tigris tigris',
        location: 'Sundarbans, Bangladesh',
        desc: 'The largest cat species, recognizable by its dark vertical stripes on orange-brown fur.',
        learnMore: 'https://en.wikipedia.org/wiki/Bengal_tiger',
        premium: true
      },
      {
        src: 'images/sloth-bear.webp',
        category: 'mammals',
        title: 'Sloth Bear',
        species: 'Melursus ursinus',
        location: 'India, Sri Lanka',
        desc: 'Unique bear with shaggy fur and a diet that includes insects.',
        learnMore: 'https://en.wikipedia.org/wiki/Sloth_bear',
        premium: true
      },
      {
        src: 'images/stunning-indian-flying-fox-with-adorable-pup-v0-wdnnz3y2sz8d1.webp',
        category: 'mammals',
        title: 'Indian Flying Fox',
        species: 'Pteropus giganteus',
        location: 'India',
        desc: 'A large bat known for its role in pollination and seed dispersal.',
        learnMore: 'https://en.wikipedia.org/wiki/Indian_flying_fox',
        premium: false
      },
      {
        src: 'images/nilgai-4310416_640.webp',
        category: 'mammals',
        title: 'Nilgai (Blue Bull)',
        species: 'Boselaphus tragocamelus',
        location: 'North India',
        desc: 'The largest antelope in India, with a blue-gray coat, often found in grasslands and open woodlands.',
        learnMore: 'https://en.wikipedia.org/wiki/Nilgai',
        premium: false
      },
      {
        src: 'images/360_F_231327425_JCtT2hETHz5xbdIvRcRsBevEdupVM9nV.webp',
        category: 'mammals',
        title: 'Indian Porcupine',
        species: 'Hystrix indica',
        location: 'India, Nepal',
        desc: 'A nocturnal rodent with long spines, commonly found in forested areas, and known for its ability to defend itself.',
        learnMore: 'https://en.wikipedia.org/wiki/Indian_crested_porcupine',
        premium: false
      },
      {
        src: 'images/Pygmy_hog_542a506dce.jpg',
        category: 'mammals',
        title: 'Pygmy Hog',
        species: 'Porcula salvania',
        location: 'Assam, India',
        desc: 'World’s smallest wild pig, critically endangered and shy.',
        learnMore: 'https://en.wikipedia.org/wiki/Pygmy_hog',
        premium: false
      },
      {
        src: 'images/qgslqvn6q5luruvfc1mz.jpg',
        category: 'mammals',
        title: 'Red Panda',
        species: 'Ailurus fulgens',
        location: 'Eastern Himalayas',
        desc: 'Small, tree-dwelling mammal known for its reddish fur and bushy tail.',
        learnMore: 'https://en.wikipedia.org/wiki/Red_panda',
        premium: true
      },
      {
        src: 'images/images.jpg',
        category: 'mammals',
        title: 'Nicobar Treeshrew',
        species: 'Tupaia nicobarica',
        location: 'Nicobar Islands',
        desc: 'Tiny, rare mammal with sharp reflexes found only in Nicobar Islands.',
        learnMore: 'https://en.wikipedia.org/wiki/Nicobar_treeshrew',
        premium: false
      },
      {
        src: 'images/dugong-spotted-while-snorkelling-beautiful-600nw-2522669297.webp',
        category: 'mammals',
        title: 'Dugong (Sea Cow)',
        species: 'Dugong dugon',
        location: 'Gulf of Mannar, India',
        desc: 'Slow-moving marine herbivore that grazes on sea grass meadows.',
        learnMore: 'https://en.wikipedia.org/wiki/Dugong',
        premium: true
      },
      {
        src: 'images/himalayan-musk-deer-Nepal.jpg',
        category: 'mammals',
        title: 'Himalayan Musk Deer',
        species: 'Moschus leucogaster',
        location: 'North India (Himalayas)',
        desc: 'Shy deer with scent glands, once hunted for its musk.',
        learnMore: 'https://en.wikipedia.org/wiki/White-bellied_musk_deer',
        premium: true
      },
      {
        src: 'images/images (1).jpg',
        category: 'mammals',
        title: 'Purple-faced Langur',
        species: 'Semnopithecus vetulus',
        location: 'Sri Lanka',
        desc: 'Endangered primate with a dark face and loud territorial calls.',
        learnMore: 'https://en.wikipedia.org/wiki/Purple-faced_langur',
        premium: true
      },
      {
        src: 'images/quokka-setonix-brachyurus-small-macropod-260nw-2326651565.webp',
        category: 'mammals',
        title: 'Quokka',
        species: 'Setonix brachyurus',
        location: 'Australia',
        desc: 'Small, smiling marsupial known for its friendliness and selfies.',
        learnMore: 'https://en.wikipedia.org/wiki/Quokka',
        premium: false
      },
      {
        src: 'images/images (2).jpg',
        category: 'mammals',
        title: 'Okapi',
        species: 'Okapia johnstoni',
        location: 'Central Africa',
        desc: 'Giraffe’s close relative with zebra-like legs and a long purple tongue.',
        learnMore: 'https://en.wikipedia.org/wiki/Okapi',
        premium: true
      },
      {
        src: 'images/images (3).jpg',
        category: 'mammals',
        title: 'Maned Wolf',
        species: 'Chrysocyon brachyurus',
        location: 'South America',
        desc: 'Tall, fox-like canid with long legs and a distinctive mane.',
        learnMore: 'https://en.wikipedia.org/wiki/Maned_wolf',
        premium: false
      },
      // Birds
      {
        src: 'images/peacock-2.jpg',
        category: 'birds',
        title: 'Indian Peafowl',
        species: 'Pavo cristatus',
        location: 'Indian Subcontinent',
        desc: 'Known for the male\'s extravagant eye-spotted tail feathers which it displays as part of courtship.',
        learnMore: 'https://en.wikipedia.org/wiki/Indian_peafowl',
        premium: false
      },
      {
        src: 'images/Bald-eagle.webp',
        category: 'birds',
        title: 'Bald Eagle',
        species: 'Haliaeetus leucocephalus',
        location: 'North America',
        desc: 'A bird of prey found in North America, known as the national bird of the United States.',
        learnMore: 'https://en.wikipedia.org/wiki/Bald_eagle',
        premium: false
      },
      {
        src: 'images/images (4).jpg',
        category: 'birds',
        title: 'Velvet-Winged Cuckoo',
        species: 'Chrysococcyx maculatus',
        location: 'South Asia: India, Nepal, Bhutan, Bangladesh',
        desc: 'A mysterious bird often imagined in folklore, symbolizing stealth and transformation.',
        learnMore: 'https://en.wikipedia.org/wiki/Chestnut-winged_cuckoo',
        premium: false
      },
      {
        src: 'images/images (5).jpg',
        category: 'birds',
        title: 'Greater Flamingo',
        species: 'Phoenicopterus roseus',
        location: 'Africa, Asia, Europe',
        desc: 'The most widespread species of the flamingo family, famous for its pink plumage.',
        learnMore: 'https://en.wikipedia.org/wiki/Greater_flamingo',
        premium: true
      },
      {
        src: 'images/00583097.jpg',
        category: 'birds',
        title: 'Horned Screamer',
        species: 'Anhima cornuta',
        location: 'South America',
        desc: 'Unusual bird with a horn-like projection from its head.',
        learnMore: 'https://en.wikipedia.org/wiki/Horned_screamer',
        premium: false
      },
      {
        src: 'images/images (6).jpg',
        category: 'birds',
        title: 'Shoebill',
        species: 'Balaeniceps rex',
        location: 'Central Africa',
        desc: 'Large bird with a shoe-shaped bill and dinosaur-like stare.',
        learnMore: 'https://en.wikipedia.org/wiki/Shoebill',
        premium: true
      },
      {
        src: 'images/images (7).jpg',
        category: 'birds',
        title: 'Hoatzin',
        species: 'Opisthocomus hoazin',
        location: 'South America (Amazon)',
        desc: 'Leaf-eating bird with clawed wings in chicks, called the "stinkbird."',
        learnMore: 'https://en.wikipedia.org/wiki/Hoatzin',
        premium: false
      },
      // Reptiles
      {
        src: 'images/gettyimages-520720208-612x612.jpg',
        category: 'reptiles',
        title: 'Nile Crocodile',
        species: 'Crocodylus niloticus',
        location: 'Sub-Saharan Africa',
        desc: 'An aggressive crocodile species found in freshwater habitats in Africa.',
        learnMore: 'https://en.wikipedia.org/wiki/Nile_crocodile',
        premium: false
      },
      {
        src: 'images/istockphoto-156258354-612x612.jpg',
        category: 'reptiles',
        title: 'Komodo Dragon',
        species: 'Varanus komodoensis',
        location: 'Komodo Island, Indonesia',
        desc: 'The largest living species of lizard, known for their size and predatory behavior.',
        learnMore: 'https://en.wikipedia.org/wiki/Komodo_dragon',
        premium: true
      },
      // Marine Life
      {
        src: 'images/images (8).jpg',
        category: 'marine',
        title: 'Great White Shark',
        species: 'Carcharodon carcharias',
        location: 'Coastal waters worldwide',
        desc: 'Known for its size, with mature individuals growing up to 6.4 m in length.',
        learnMore: 'https://en.wikipedia.org/wiki/Great_white_shark',
        premium: false
      },
      {
        src: 'images/360_F_812649292_92XrAvtMUtqYKfAyEyQcNMNfvRGpv6th.jpg',
        category: 'marine',
        title: 'Moon Jellyfish',
        species: 'Aurelia aurita',
        location: 'Worldwide oceans',
        desc: 'A translucent jellyfish with four horseshoe-shaped gonads visible through the bell.',
        learnMore: 'https://en.wikipedia.org/wiki/Aurelia_aurita',
        premium: false
      },
      // Insects
      {
        src: 'images/monarch-butterfly-flowers-bush.webp',
        category: 'insects',
        title: 'Monarch Butterfly',
        species: 'Danaus plexippus',
        location: 'North America',
        desc: 'Known for its annual migration across North America and its striking orange and black pattern.',
        learnMore: 'https://en.wikipedia.org/wiki/Monarch_butterfly',
        premium: false
      },
      // Endangered Species
      {
        src: 'images/images (9).jpg',
        category: 'endangered',
        title: 'Giant Panda',
        species: 'Ailuropoda melanoleuca',
        location: 'Central China',
        desc: 'Characterized by its bold black-and-white coat and rotund body, primarily eats bamboo.',
        learnMore: 'https://en.wikipedia.org/wiki/Giant_panda',
        premium: true
      },
      {
        src: 'images/istockphoto-616882524-612x612.jpg',
        category: 'endangered',
        title: 'Bornean Orangutan',
        species: 'Pongo pygmaeus',
        location: 'Borneo',
        desc: 'A species of orangutan native to the island of Borneo, highly intelligent and endangered.',
        learnMore: 'https://en.wikipedia.org/wiki/Bornean_orangutan',
        premium: true
      },
      // Rare Species
      {
        src: 'images/carnivore-Snow-leopard-regions-subcontinent-Asia-Indian.webp',
        category: 'rare',
        title: 'Snow Leopard',
        species: 'Panthera uncia',
        location: 'Himalayan Mountains',
        desc: 'A large cat native to the mountain ranges of Central and South Asia, known as the "ghost of the mountains".',
        learnMore: 'https://en.wikipedia.org/wiki/Snow_leopard',
        premium: true
      },
      {
        src: 'images/images (10).jpg',
        category: 'rare',
        title: 'Axolotl',
        species: 'Ambystoma mexicanum',
        location: 'Lake Xochimilco, Mexico',
        desc: 'A paedomorphic salamander related to the tiger salamander, critically endangered in the wild.',
        learnMore: 'https://en.wikipedia.org/wiki/Axolotl',
        premium: true
      }
    ];

    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('image-title');
    const lightboxDesc = document.getElementById('image-desc');
    const lightboxCategory = document.getElementById('image-category');
    const imageSpecies = document.getElementById('image-species');
    const imageLocation = document.getElementById('image-location');
    const learnMoreLink = document.getElementById('learn-more');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const gallerySearch = document.getElementById('gallery-search');
    const gallerySearchBtn = document.getElementById('gallery-search-btn');
    const premiumDownloadBtn = document.querySelector('.premium-download');

    let currentImageIndex = 0;
    let filteredImages = [...images];
    let activeFilter = 'all';

    // Initialize the gallery
    function initGallery() {
      if (!galleryGrid) return;
      galleryGrid.innerHTML = '';

      const searchTerm = sessionStorage.getItem('searchTerm');
      if (searchTerm) {
        filterBySearch(searchTerm);
        sessionStorage.removeItem('searchTerm');
        if (gallerySearch) gallerySearch.value = searchTerm;
      } else {
        filteredImages = [...images];
        renderGallery();
      }
    }

    // Render gallery items
    function renderGallery() {
      if (!galleryGrid) return;
      galleryGrid.innerHTML = '';

      if (filteredImages.length === 0) {
        galleryGrid.innerHTML = `
          <div class="no-results">
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px;"></i>
            <h3>No results found</h3>
            <p>Try a different search term or browse all categories</p>
          </div>
        `;
        return;
      }

      filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${image.category} ${image.premium ? 'premium' : ''}`;
        galleryItem.setAttribute('data-index', index);

        galleryItem.innerHTML = `
          <div class="gallery-item-inner">
            <div class="gallery-item-front">
              ${image.premium ? '<div class="premium-lock"><i class="fas fa-crown"></i></div>' : ''}
              <img src="${image.src}" alt="${image.title}" loading="lazy">
            </div>
            <div class="gallery-item-back">
              <h3>${image.title}</h3>
              <p>${image.desc}</p>
              <div class="image-meta">
                <span>${image.species}</span>
                <span>${image.location}</span>
              </div>
              <a href="${image.learnMore}" target="_blank" class="learn-more">Learn More</a>
              ${image.premium ? '<button class="premium-download"><i class="fas fa-crown"></i> Premium Content</button>' : ''}
            </div>
          </div>
        `;

        galleryItem.addEventListener('click', (e) => {
          if (!e.target.closest('a') && !e.target.closest('button')) {
            openLightbox(index);
          }
        });

        galleryGrid.appendChild(galleryItem);
      });
    }

    // Filter gallery items by category
    function filterByCategory(category) {
      activeFilter = category;
      filteredImages = category === 'all' ? [...images] : images.filter(img => img.category === category);
      renderGallery();
    }

    // Filter by search term
    function filterBySearch(term) {
      const lowerTerm = term.toLowerCase();
      filteredImages = images.filter(img =>
        img.title.toLowerCase().includes(lowerTerm) ||
        img.desc.toLowerCase().includes(lowerTerm) ||
        img.species.toLowerCase().includes(lowerTerm) ||
        img.location.toLowerCase().includes(lowerTerm) ||
        img.category.toLowerCase().includes(lowerTerm)
      );
      renderGallery();
    }

    // Open lightbox with selected image
    function openLightbox(index) {
      if (!lightbox) return;
      currentImageIndex = index;
      updateLightbox();
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    // Update lightbox content
    function updateLightbox() {
      if (!lightboxImg || !lightboxTitle || !lightboxDesc || !imageSpecies || !imageLocation || !learnMoreLink) return;
      const image = filteredImages[currentImageIndex];
      lightboxImg.src = image.src;
      lightboxImg.alt = image.title;
      lightboxTitle.textContent = image.title;
      lightboxDesc.textContent = image.desc;
      imageSpecies.textContent = image.species;
      imageLocation.textContent = image.location;
      lightboxCategory.textContent = `Category: ${image.category.replace(/^\w/, c => c.toUpperCase())}`;
      learnMoreLink.href = image.learnMore;

      if (premiumDownloadBtn) {
        premiumDownloadBtn.style.display = image.premium ? 'flex' : 'none';
      }
    }

    // Close lightbox
    function closeLightbox() {
      if (!lightbox) return;
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Navigate to previous image
    function showPreviousImage() {
      currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
      updateLightbox();
    }

    // Navigate to next image
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
      updateLightbox();
    }

    // Handle filter button clicks
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          filterBtns.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          const filter = this.getAttribute('data-filter');
          filterByCategory(filter);
        });
      });
    }

    // Handle gallery search
    if (gallerySearchBtn && gallerySearch) {
      gallerySearchBtn.addEventListener('click', () => {
        filterBySearch(gallerySearch.value.trim());
      });

      gallerySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          filterBySearch(gallerySearch.value.trim());
        }
      });
    }

    // Lightbox controls
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPreviousImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
          showPreviousImage();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      }
    });

    // Close lightbox when clicking outside the image
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Premium download button
    if (premiumDownloadBtn) {
      premiumDownloadBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('This is a premium feature. Upgrade to download.', 'warning');
      });
    }

    // Initialize the gallery on page load
    initGallery();
  }

  // Premium Page Specific
  if (document.querySelector('.premium-page')) {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
      card.addEventListener('click', function (e) {
        if (!e.target.closest('.select-plan-btn')) {
          this.querySelector('.pricing-card-inner').classList.toggle('flipped');
        }
      });
    });

    const planButtons = document.querySelectorAll('.select-plan-btn');
    planButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const plan = this.getAttribute('data-plan');
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;

        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
          showToast(`Success! You've selected the ${plan} plan.`, 'success');
        }, 2000);
      });
    });
  }
});