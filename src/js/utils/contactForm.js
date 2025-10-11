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
  form.action = "https://api.web3forms.com/submit";
  form.method = "POST";
  form.setAttribute("aria-label", "Contact form");

  const accessKeyInput = document.createElement("input");
  accessKeyInput.type = "hidden";
  accessKeyInput.name = "access_key";
  accessKeyInput.value = "cc45b2aa-f126-41ef-b4ba-7dd8e4f3dcd2";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Name";
  nameInput.required = true;
  nameInput.className = "contact-input";
  nameInput.setAttribute("aria-label", "Your name");
  nameInput.setAttribute("aria-required", "true");

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "Email";
  emailInput.required = true;
  emailInput.className = "contact-input";
  emailInput.setAttribute("aria-label", "Your email address");
  emailInput.setAttribute("aria-required", "true");

  const messageInput = document.createElement("textarea");
  messageInput.name = "message";
  messageInput.placeholder = "Message";
  messageInput.required = true;
  messageInput.rows = 6;
  messageInput.className = "contact-textarea";
  messageInput.setAttribute("aria-label", "Your message");
  messageInput.setAttribute("aria-required", "true");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className =
    "contact-submit-btn btn-base btn-clipped btn-lg btn-primary";
  submitButton.setAttribute("aria-label", "Send message");

  const sendIcon = document.createElement("img");
  sendIcon.src = "public/assets/icons/fa6-solid_shuttle-space.svg";
  sendIcon.alt = "";
  sendIcon.setAttribute("aria-hidden", "true");
  sendIcon.className = "btn-icon-md";

  submitButton.appendChild(sendIcon);
  submitButton.appendChild(document.createTextNode("Send message"));

  form.addEventListener("submit", handleFormSubmit);

  form.appendChild(accessKeyInput);
  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(messageInput);
  form.appendChild(submitButton);
  formContainer.appendChild(form);

  return formContainer;
}

function createContactLinks() {
  const linksContainer = document.createElement("div");
  linksContainer.className = "contact-links-container";

  const downloadData = [
    {
      text: "Download CV",
      href: "public/links/CV.pdf",
      icon: "public/assets/icons/mi_document.svg",
      iconAlt: "CV icon",
      download: "Lars_Torp_Pettersen_CV.pdf",
    },
    {
      text: "Download Cover Letter",
      href: "public/links/CoverLetter.pdf",
      icon: "public/assets/icons/humbleicons_document.svg",
      iconAlt: "Cover Letter icon",
      download: "Lars_Torp_Pettersen_Cover_Letter.pdf",
    },
  ];

  downloadData.forEach((downloadItem) => {
    const linkElement = document.createElement("a");
    linkElement.href = downloadItem.href;
    linkElement.className = "contact-link contact-download-link";
    linkElement.download = downloadItem.download;
    linkElement.setAttribute(
      "aria-label",
      `Download ${downloadItem.text.replace("Download ", "")}`
    );

    const icon = document.createElement("img");
    icon.src = downloadItem.icon;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    icon.className = "contact-link-icon";

    const text = document.createElement("span");
    text.textContent = downloadItem.text;
    text.className = "contact-link-text";

    linkElement.appendChild(icon);
    linkElement.appendChild(text);
    linksContainer.appendChild(linkElement);
  });

  const linksData = [
    {
      text: "E-Mail",
      href: "mailto:github.enviably914@passinbox.com",
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
      href: "https://www.linkedin.com/in/larstpet/",
      icon: "public/assets/icons/mdi_linkedin.svg",
      iconAlt: "LinkedIn icon",
    },
    {
      text: "SubStack",
      href: "https://substack.com/@larstp",
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
      linkElement.setAttribute(
        "aria-label",
        `${linkData.text} (opens in new tab)`
      );
    } else {
      linkElement.setAttribute("aria-label", linkData.text);
    }

    const icon = document.createElement("img");
    icon.src = linkData.icon;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
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

  const form = e.target;
  const formData = new FormData(form);

  const submitButton = form.querySelector(".contact-submit-btn");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Thank you for your message! I'll get back to you soon.");
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again or contact me directly via email."
      );
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}
