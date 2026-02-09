<template>
    <section class="funfact-section">
        <div class="container">
            <div class="outer-box">
                <div class="funfact-block" v-for="(item, index) in funfacts" :key="index">
                    <div class="inner-box">
                        <div class="icon" v-html="item.icon"></div>
                        <div class="content-box">
                            <h3 class="title">
                                <span class="count" :ref="`count${index}`">0</span>{{ item.suffix }}
                            </h3>
                            <span class="sub-title">{{ item.subtitle }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const funfacts = ref([
    {
    icon: `<svg width="55" height="60" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="teamGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#a87f1f" stop-opacity="1"/>
                <stop offset="100%" stop-color="#0c401c" stop-opacity="0.8"/>
            </linearGradient>
            <linearGradient id="teamGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0c401c" stop-opacity="1"/>
                <stop offset="100%" stop-color="#a87f1f" stop-opacity="0.8"/>
            </linearGradient>
            <filter id="teamShadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <circle cx="27.5" cy="27.5" r="26" stroke="url(#teamGradient1)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 3"/>
        <circle cx="27.5" cy="27.5" r="21" fill="url(#teamGradient2)" fill-opacity="0.1"/>
        <path d="M35 22C35 26.4183 31.4183 30 27 30C22.5817 30 19 26.4183 19 22C19 17.5817 22.5817 14 27 14C31.4183 14 35 17.5817 35 22Z" fill="url(#teamGradient1)" fill-opacity="0.15"/>
        <circle cx="27" cy="38" r="8" fill="url(#teamGradient2)" fill-opacity="0.1"/>
        <path d="M20 40C23.0376 40 25.5 37.5376 25.5 34.5C25.5 31.4624 23.0376 29 20 29C16.9624 29 14.5 31.4624 14.5 34.5C14.5 37.5376 16.9624 40 20 40Z" fill="url(#teamGradient1)" fill-opacity="0.2"/>
        <path d="M34 40C37.0376 40 39.5 37.5376 39.5 34.5C39.5 31.4624 37.0376 29 34 29C30.9624 29 28.5 31.4624 28.5 34.5C28.5 37.5376 30.9624 40 34 40Z" fill="url(#teamGradient2)" fill-opacity="0.2"/>
        <circle cx="20" cy="22" r="2" fill="url(#teamGradient1)"/>
        <circle cx="34" cy="22" r="2" fill="url(#teamGradient2)"/>
    </svg>`,
    count: 150,
    suffix: '+',
    subtitle: 'Team member'
},
{
    icon: `<svg width="55" height="60" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="projectGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#a87f1f"/>
                <stop offset="50%" stop-color="#d4af37"/>
                <stop offset="100%" stop-color="#0c401c"/>
            </linearGradient>
            <linearGradient id="projectGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0c401c"/>
                <stop offset="50%" stop-color="#a87f1f"/>
                <stop offset="100%" stop-color="#d4af37"/>
            </linearGradient>
            <filter id="projectGlow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feFlood flood-color="#a87f1f" flood-opacity="0.3"/>
                <feComposite in2="blur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <rect x="12" y="12" width="31" height="31" rx="8" stroke="url(#projectGradient1)" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="15" y="15" width="25" height="25" rx="6" fill="url(#projectGradient2)" fill-opacity="0.05"/>
        <path d="M12 20H43" stroke="url(#projectGradient1)" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="18" y="25" width="7" height="12" rx="3" fill="url(#projectGradient1)" fill-opacity="0.3"/>
        <rect x="28" y="25" width="7" height="17" rx="3" fill="url(#projectGradient2)" fill-opacity="0.3"/>
        <rect x="38" y="25" width="7" height="10" rx="3" fill="url(#projectGradient1)" fill-opacity="0.3"/>
        <path d="M20 31L22 29L24 33L28 27L30 29L34 25" stroke="url(#projectGradient2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#projectGlow)"/>
        <circle cx="15" cy="16" r="2" fill="url(#projectGradient1)"/>
        <circle cx="27.5" cy="16" r="2" fill="url(#projectGradient2)"/>
        <circle cx="40" cy="16" r="2" fill="url(#projectGradient1)"/>
        <path d="M15 12V16" stroke="url(#projectGradient1)" stroke-width="2" stroke-linecap="round"/>
        <path d="M27.5 12V16" stroke="url(#projectGradient2)" stroke-width="2" stroke-linecap="round"/>
        <path d="M40 12V16" stroke="url(#projectGradient1)" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    count: 150,
    suffix: 'k+',
    subtitle: 'Complete project'
},
{
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="awardGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#d4af37" stop-opacity="1"/>
                <stop offset="50%" stop-color="#a87f1f" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#0c401c" stop-opacity="0.6"/>
            </radialGradient>
            <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFD700"/>
                <stop offset="50%" stop-color="#FFED4E"/>
                <stop offset="100%" stop-color="#FFD700"/>
            </linearGradient>
            <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                <feFlood flood-color="#FFD700" flood-opacity="0.4"/>
                <feComposite in2="blur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <path d="M30 12L38 28L55 31L42 43L45 60L30 51L15 60L18 43L5 31L22 28L30 12Z" fill="url(#awardGradient)" fill-opacity="0.15" stroke="url(#starGradient)" stroke-width="1.5"/>
        <path d="M30 17L36.5 29.5L50 32L40 41L43 54L30 46L17 54L20 41L10 32L23.5 29.5L30 17Z" fill="url(#starGradient)" fill-opacity="0.3" filter="url(#starGlow)"/>
        <circle cx="30" cy="30" r="10" fill="url(#awardGradient)" fill-opacity="0.2" stroke="url(#starGradient)" stroke-width="1"/>
        <path d="M25 35L28 38L35 31" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="45" cy="15" r="4" fill="url(#starGradient)" fill-opacity="0.6">
            <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="15" cy="45" r="3" fill="url(#awardGradient)" fill-opacity="0.6">
            <animate attributeName="r" values="3;4;3" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="45" r="2" fill="url(#starGradient)" fill-opacity="0.6">
            <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="10" cy="15" r="2" fill="url(#awardGradient)" fill-opacity="0.6">
            <animate attributeName="r" values="2;3;2" dur="2.8s" repeatCount="indefinite"/>
        </circle>
    </svg>`,
    count: 10,
    suffix: '+',
    subtitle: 'Winning award'
},
{
    icon: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="reviewGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#a87f1f"/>
                <stop offset="100%" stop-color="#0c401c"/>
            </linearGradient>
            <linearGradient id="reviewGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0c401c"/>
                <stop offset="100%" stop-color="#a87f1f"/>
            </linearGradient>
            <filter id="reviewShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#a87f1f" flood-opacity="0.3"/>
            </filter>
        </defs>
        <circle cx="30" cy="30" r="28" stroke="url(#reviewGradient1)" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="30" cy="30" r="24" fill="url(#reviewGradient2)" fill-opacity="0.05"/>
        <path d="M20 30C18.5 31.5 17.5 33.5 17.5 35.5" stroke="url(#reviewGradient1)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/>
        <path d="M40 30C41.5 31.5 42.5 33.5 42.5 35.5" stroke="url(#reviewGradient2)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/>
        <path d="M23 20C25.3333 22.3333 28.6667 22.3333 31 20" stroke="url(#reviewGradient1)" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="22" cy="28" rx="2" ry="3" fill="url(#reviewGradient1)"/>
        <ellipse cx="38" cy="28" rx="2" ry="3" fill="url(#reviewGradient2)"/>
        <path d="M25 34C25 34 27 36 30 36C33 36 35 34 35 34" stroke="url(#reviewGradient1)" stroke-width="2" stroke-linecap="round"/>
        <path d="M20 46L25 44" stroke="url(#reviewGradient1)" stroke-width="2" stroke-linecap="round"/>
        <path d="M40 46L35 44" stroke="url(#reviewGradient2)" stroke-width="2" stroke-linecap="round"/>
        <path d="M30 44V49" stroke="url(#reviewGradient1)" stroke-width="2" stroke-linecap="round"/>
        <path d="M26 51H34" stroke="url(#reviewGradient2)" stroke-width="2" stroke-linecap="round"/>
        <circle cx="18" cy="18" r="3" fill="url(#reviewGradient1)" fill-opacity="0.3">
            <animate attributeName="cy" values="18;20;18" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="42" cy="18" r="3" fill="url(#reviewGradient2)" fill-opacity="0.3">
            <animate attributeName="cy" values="18;16;18" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="30" cy="15" r="2" fill="url(#reviewGradient1)" fill-opacity="0.5">
            <animate attributeName="cx" values="30;32;30" dur="4s" repeatCount="indefinite"/>
        </circle>
        <path d="M33 40L35 42L39 38" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#reviewShadow)"/>
    </svg>`,
    count: 600,
    suffix: '+',
    subtitle: 'Client review'
}
]);

const animateCounters = () => {
    funfacts.value.forEach((item, index) => {
        const element = document.querySelectorAll('.count')[index];
        if (element) {
            let current = 0;
            const target = item.count;
            const duration = 2000;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }
    });
};

onMounted(() => {
    // Démarrer l'animation quand la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const section = document.querySelector('.funfact-section');
    if (section) observer.observe(section);
});
</script>
