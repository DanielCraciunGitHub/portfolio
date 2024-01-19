import ContactForm from "./ContactForm"

export default function page() {
  return (
    <section className="flex justify-center items-center">
      <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-32 lg:py-16 lg:grid-cols-12 lg:space-y-0 space-y-10 z-10">
        <div className="lg:col-span-5">
          <h1 className="max-w-3xl text-lg font-semibold md:text-2xl xl:text-3xl mb-4">
            Let's Connect
          </h1>
          <p className="text-muted-foreground">
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          </p>
          <div>TODO: ADD THE SOCIALS LINKS</div>
        </div>
        <div className="flex flex-col items-center lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
