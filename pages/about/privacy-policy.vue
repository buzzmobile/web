<template>
  <div>
    <h1 class="about-h1">Privacy Policy</h1>
    <h2 class="about-h2">What personal information do we collect from the people that visit our website?</h2>
    <p class="about-p">None. We do not ask for any personal information but do capture computer information to enable us to improve our website.
      You can opt of out of this.</p>

    <h2 class="about-h2">When do we collect your computers information?</h2>
    <p class="about-p">If you visit us again after previously opting in to allow us to do this, or when you navigate within our site.</p>

    <h2 class="about-h2">How do we use your computers information?</h2>
    <p class="about-p">To improve our website in order to better serve you.</p>

    <h2 class="about-h2">How do we protect your information?</h2>
    <p class="about-p">we use SSL, in industry standard to ensure your computers' data cannot be intercepted and read</p>

    <h2 class="about-h2">Do we use 'cookies'?</h2>
    <p class="about-p">Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your
      Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture
      and remember certain information. We use cookies to:</p>
      <ul class="about-p">
        <li>Understand and save user's preferences for future visits.</li>
        <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools
          in the future. We may also use trusted third-party services that track this information on our behalf.</li>
      </ul>
      <p class="about-p">You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies.
      You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to
      learn the correct way to modify your cookies. If you turn cookies off, It won't affect the user's experience.</p>
   

    <h2 class="about-h2">Third-party disclosure</h2>
    <p class="about-p">We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide
      users with advance notice. This does not include website hosting partners and other parties who assist us in operating
      our website, conducting our business, or serving our users, so long as those parties agree to keep this information
      confidential. We may also release information when it's release is appropriate to comply with the law, enforce our
      site policies, or protect ours or others' rights, property or safety. However, non-personally identifiable visitor
      information may be provided to other parties for marketing, advertising, or other uses.</p>

    <h2 class="about-h2">Third-party links</h2>
    <p class="about-p">We offer third-party products or services on our website. These third-party sites have separate and independent privacy
      policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless,
      we seek to protect the integrity of our site and welcome any feedback about these sites.</p>

    <h2 class="about-h2">Contacting Us</h2>
    <p class="about-p">
      If there are any questions regarding this privacy policy, you may contact us using the information in our
      <a class="text-brand-pink" href="/about/contact-us">Contact Pages</a>.</p>
  </div>
</template>

<script>
export default {
    head () {
        return {
            title: "Privacy Policy - Mopho",
            meta: [
                { hid: "description", name: "description", content: "Privacy Policy" }
            ]
        };
    }
};
</script>