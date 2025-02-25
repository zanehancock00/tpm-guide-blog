// Post content stored directly in JavaScript for local development
const postContents = {
    'post1': `# Getting Started as a TPM

As a new Technical Program Manager (TPM), you're stepping into a critical role that bridges the gap between technical implementation and business objectives. This guide will help you navigate your first few months and set you up for success.

## What is a TPM?

A Technical Program Manager is responsible for driving complex technical programs from inception to completion. Unlike Project Managers who might focus more on timelines and resources, TPMs need deep technical understanding to make informed decisions and effectively communicate between technical and non-technical stakeholders.

## Key Responsibilities

1. **Program Planning and Execution**: Create comprehensive program plans, identify dependencies, and manage risks.
2. **Cross-functional Coordination**: Align engineering, product, design, and other teams around common goals.
3. **Technical Understanding**: Develop sufficient technical depth to ask the right questions and make informed decisions.
4. **Communication**: Translate technical concepts for business stakeholders and vice versa.
5. **Problem Solving**: Identify and resolve blockers that impede program progress.

## First 30 Days: Focus on Learning

Your first month should be dedicated to:

- Understanding your product's architecture and technical stack
- Building relationships with key engineers and stakeholders
- Learning existing processes and tooling
- Mapping dependencies between teams and workstreams
- Identifying the critical path for your programs

Don't rush to make changes. Take time to understand why things work the way they do before proposing improvements.

## Building Your TPM Toolkit

Every effective TPM has a set of tools and frameworks they rely on:

- **RACI matrices** for clarifying decision-making authority
- **Risk registers** for tracking and mitigating potential issues
- **Dependency trackers** for visualizing cross-team requirements
- **Decision logs** for maintaining a record of key decisions and their rationale
- **Status reports** for keeping stakeholders informed of progress

In the next article, we'll dive deeper into cross-team coordination strategies and how to run effective program reviews.`,
    'post2': `# Effective Cross-Team Coordination

One of the most challenging aspects of a TPM's role is coordinating work across multiple teams that often have different priorities, processes, and communication styles. This article provides strategies for successful cross-team coordination.

## The Challenges of Cross-Team Work

Cross-team coordination introduces several challenges:

- **Misaligned priorities**: Different teams have different OKRs and roadmaps
- **Communication barriers**: Teams may have different communication norms and tools
- **Dependency management**: Work sequencing becomes more complex with multiple teams
- **Competing resources**: Teams may be fighting for the same limited resources
- **Cultural differences**: Engineering, product, design, and other teams have different cultures

## Key Strategies for Success

### 1. Establish a Clear Governance Model

Define and document how decisions will be made:

- Who has decision-making authority for different aspects of the program
- How conflicts will be resolved
- What escalation paths look like
- Which forums exist for cross-team alignment

### 2. Create Shared Understanding

Ensure all teams understand:

- The overall goals and success metrics of the program
- How their work contributes to those goals
- The end-to-end user journey or system architecture
- Key dependencies between teams
- Major milestones and deadlines

Visual aids like journey maps, architecture diagrams, and dependency graphs are invaluable here.

### 3. Implement Effective Communication Patterns

Establish regular touchpoints:

- **Daily**: Quick async updates for blockers and critical issues
- **Weekly**: Cross-team sync meetings focused on dependencies and integration points
- **Bi-weekly/Monthly**: Program reviews with broader stakeholders
- **Ad-hoc**: Issue-specific working sessions as needed

### 4. Build a Dependency Management System

Create a system that:

- Clearly identifies dependencies between teams
- Specifies what each team needs to deliver and by when
- Tracks the status of each dependency
- Highlights at-risk dependencies that need attention

### 5. Foster Relationships Across Teams

Technical solutions aren't enough—relationships matter:

- Schedule regular 1:1s with key members of each team
- Create opportunities for teams to socialize and build rapport
- Recognize and celebrate cross-team collaboration successes
- Address interpersonal conflicts quickly and directly

## Running Effective Cross-Team Meetings

Cross-team meetings are your primary forum for alignment. Make them count:

1. **Have a clear agenda** focused on cross-team issues
2. **Pre-distribute materials** so people come prepared
3. **Focus on decisions and actions**, not status updates
4. **Document outcomes** and follow up on action items
5. **Invite only those who need to be there**

Remember that your role as a TPM is to remove friction in cross-team collaboration, not add process for its own sake. Always ask whether a meeting, document, or process truly helps teams work together more effectively.`
};

document.addEventListener('DOMContentLoaded', function() {
    // Load markdown posts
    loadPosts();

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Function to load markdown posts
function loadPosts() {
    const contentSection = document.getElementById('content');
    
    try {
        // Post metadata
        const posts = [
            { title: 'Getting Started as a TPM', id: 'post1', date: 'February 24, 2025' },
            { title: 'Effective Cross-Team Coordination', id: 'post2', date: 'February 25, 2025' }
        ];
        
        // Create post previews
        let html = '<h2>Latest Articles</h2>';
        
        for (const post of posts) {
            const markdown = postContents[post.id];
            const preview = extractPreview(markdown);
            
            html += `
                <div class="post">
                    <h2>${post.title}</h2>
                    <div class="post-meta">${post.date}</div>
                    <div class="post-preview">${marked.parse(preview)}</div>
                    <a href="#" class="cta-button post-link" data-post-id="${post.id}">Read More</a>
                </div>
            `;
        }
        
        contentSection.innerHTML = html;
        
        // Add event listeners to post links
        document.querySelectorAll('.post-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                loadFullPost(this.getAttribute('data-post-id'));
            });
        });
        
    } catch (error) {
        console.error('Error loading posts:', error);
        contentSection.innerHTML = '<p>Error loading content. Please try again later.</p>';
    }
}

// Function to load a full post
function loadFullPost(postId) {
    const contentSection = document.getElementById('content');
    
    try {
        const markdown = postContents[postId];
        if (markdown) {
            const html = marked.parse(markdown);
            
            contentSection.innerHTML = `
                <div class="post full-post">
                    ${html}
                    <a href="#" class="cta-button back-link">Back to Articles</a>
                </div>
            `;
            
            // Add event listener to back button
            document.querySelector('.back-link').addEventListener('click', function(e) {
                e.preventDefault();
                loadPosts();
            });
        } else {
            throw new Error('Post not found');
        }
    } catch (error) {
        console.error('Error loading full post:', error);
        contentSection.innerHTML = '<p>Error loading post. Please try again later.</p>';
    }
}

// Function to extract a preview from markdown content
function extractPreview(markdown) {
    // Get the first 150 characters, but try to end at a sentence
    let preview = markdown.substring(0, 250);
    const lastPeriod = preview.lastIndexOf('.');
    
    if (lastPeriod > 150) {
        preview = preview.substring(0, lastPeriod + 1);
    }
    
    return preview + '...';
}