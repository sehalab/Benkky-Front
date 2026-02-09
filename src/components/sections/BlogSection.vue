<template>
    <section class="blog-section-three pt-120 pb-120">
        <div class="container">
            <div class="sec-title center mb-50">
                <h6 class="sub-title wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">New & Blogs</h6>
                <h2 class="title wow splt-txt" data-splitting>get update news & Blogs <br> by company</h2>
            </div>

            <div class="row g-4">
                <div class="col-md-6 col-xl-4"
                     v-for="(post, index) in blogPosts"
                     :key="post.id"
                     :class="`wow fadeInUp`"
                     :data-wow-delay="`${index * 200}ms`"
                     data-wow-duration="1500ms">
                    <div class="blog-block-three">
                        <div class="inner-box">
                            <div class="image-box">
                                <figure class="image">
                                    <img :src="`/images/blog/blog-three-image${index + 1}.jpg`" :alt="post.title">
                                    <img :src="`/images/blog/blog-three-image${index + 1}.jpg`" :alt="post.title" class="hover-image">
                                </figure>
                            </div>
                            <div class="content-box">
                                <div class="content">
                                    <span class="sub-title">{{ post.category }}</span>
                                    <h4 class="title">
                                        <Link :href="`/blog/${post.slug}`">{{ post.title }}</Link>
                                    </h4>
                                </div>
                                <ul class="info">
                                    <li>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>
                                        <Link :href="`/author/${post.author.id}`">{{ post.author.name }}</Link>
                                    </li>
                                    <li>
                                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>
                                        <Link :href="`/blog/${post.slug}#comments`">Comments ({{ post.comments }})</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-50">
                <Link class="btn-one-rounded" href="/blog">
                    View All Posts <i class="fa-regular fa-angle-right"></i>
                </Link>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const blogPosts = ref([
    {
        id: 1,
        title: '10 Proven Strategies to Scale Your Business in 2025',
        slug: '10-proven-strategies-scale-business-2025',
        category: 'Digital Marketing',
        excerpt: 'Learn the most effective strategies to grow your business this year.',
        author: { id: 1, name: 'Brooklyn Simmon' },
        date: 'Jul 27, 2025',
        comments: 5,
        image: 'blog-three-image1.jpg'
    },
    {
        id: 2,
        title: 'Time Management Tips for Busy Entrepreneurs',
        slug: 'time-management-tips-busy-entrepreneurs',
        category: 'Business Consulting',
        excerpt: 'Essential time management techniques for successful entrepreneurs.',
        author: { id: 2, name: 'Leslie Alexander' },
        date: 'Jul 25, 2025',
        comments: 3,
        image: 'blog-three-image2.jpg'
    },
    {
        id: 3,
        title: 'Why Networking is Crucial for Business Growth',
        slug: 'why-networking-crucial-business-growth',
        category: 'Business Growth',
        excerpt: 'Discover how networking can accelerate your business growth.',
        author: { id: 3, name: 'Savannah Nguyen' },
        date: 'Jul 22, 2025',
        comments: 5,
        image: 'blog-three-image3.jpg'
    }
]);
</script>
