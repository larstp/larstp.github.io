export function createContactSection() {
  const contactSection = document.createElement("section");
  contactSection.className = "contact-section contact-fade";

  const heading = document.createElement("h4");
  heading.textContent = "Say hello!";
  heading.className = "contact-heading";

  const subheading = document.createElement("p");
  subheading.textContent =
    "Do you have any projects you would be interested in collaborating on? Any tips or tricks, or maybe a good book recommendation? Feel free to send me a message!";
  subheading.className = "contact-subheading";

  const contentContainer = document.createElement("div");
  contentContainer.className = "contact-content";

  const formContainer = createContactForm();

  const linksContainer = createContactLinks();

  contentContainer.appendChild(formContainer);
  contentContainer.appendChild(linksContainer);

  contactSection.appendChild(heading);
  contactSection.appendChild(subheading);
  contactSection.appendChild(contentContainer);

  return contactSection;
}

function createContactForm() {
  const formContainer = document.createElement("div");
  formContainer.className = "contact-form-container";

  const form = document.createElement("form");
  form.className = "contact-form";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "Email";
  emailInput.required = true;
  emailInput.className = "contact-input";

  const messageInput = document.createElement("textarea");
  messageInput.name = "message";
  messageInput.placeholder = "Message";
  messageInput.required = true;
  messageInput.rows = 5;
  messageInput.className = "contact-textarea";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "contact-submit-btn";

  const sendIcon = document.createElement("img");
  sendIcon.src = "public/assets/icons/ic_round-send.svg";
  sendIcon.alt = "Send icon";
  sendIcon.className = "btn-icon";

  submitButton.appendChild(sendIcon);
  submitButton.appendChild(document.createTextNode("Send message"));

  form.addEventListener("submit", handleFormSubmit);

  form.appendChild(emailInput);
  form.appendChild(messageInput);
  form.appendChild(submitButton);
  formContainer.appendChild(form);

  return formContainer;
}

function createContactLinks() {
  const linksContainer = document.createElement("div");
  linksContainer.className = "contact-links-container";

  const linksData = [
    {
      text: "E-Mail",
      href: "mailto:your-email@example.com", // -------------------------Update with actual email
      icon: "public/assets/icons/material-symbols_mail-rounded.svg",
      iconAlt: "Email icon",
    },
    {
      text: "GitHub",
      href: "https://github.com/larstp",
      icon: "public/assets/icons/mdi_github.svg",
      iconAlt: "GitHub icon",
    },
    {
      text: "LinkedIn",
      href: "https://linkedin.com/in/your-profile", // ---------------------Update with actual LinkedIn
      icon: "public/assets/icons/mdi_linkedin.svg",
      iconAlt: "LinkedIn icon",
    },
    {
      text: "SubStack",
      href: "https://your-substack.substack.com", // ---------------------Update with actual SubStack
      icon: "public/assets/icons/bi_substack.svg",
      iconAlt: "SubStack icon",
    },
  ];

  linksData.forEach((linkData) => {
    const linkElement = document.createElement("a");
    linkElement.href = linkData.href;
    linkElement.className = "contact-link";
    if (linkData.href.startsWith("http")) {
      linkElement.target = "_blank";
      linkElement.rel = "noopener noreferrer";
    }

    const icon = document.createElement("img");
    icon.src = linkData.icon;
    icon.alt = linkData.iconAlt;
    icon.className = "contact-link-icon";

    const text = document.createElement("span");
    text.textContent = linkData.text;
    text.className = "contact-link-text";

    linkElement.appendChild(icon);
    linkElement.appendChild(text);
    linksContainer.appendChild(linkElement);
  });

  return linksContainer;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const message = formData.get("message");

  // For now, just log the form data
  // You can replace this with your actual form submission logic
  // console.log("Form submitted:", { email, message });

  alert("Thank you for your message! I'll get back to you soon.");

  e.target.reset();
}
