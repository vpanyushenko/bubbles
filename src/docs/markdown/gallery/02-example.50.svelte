<script>
  import { Gallery, Card, CardHeader, CardFooter, showModal, getFormData, showLoading, hideLoading } from "$lib/index";

  import image1 from "$docs/icons/gallery/1.jpg";
  import image2 from "$docs/icons/gallery/2.jpg";
  import image3 from "$docs/icons/gallery/3.jpg";
  import image4 from "$docs/icons/gallery/4.jpg";
  import image5 from "$docs/icons/gallery/5.jpg";
  import image6 from "$docs/icons/gallery/6.jpg";
  import image7 from "$docs/icons/gallery/7.jpg";
  import image8 from "$docs/icons/gallery/8.jpg";

  let page = 1;
  let images = [image1, image2, image3, image4, image5, image6, image7, image8];
  const buttons = [
    {
      icon: "trash",
      color: "error",
      invert_icon: true,
      larger: false,
      onclick: (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
    },
    {
      label: "Download image",
      color: "gray-lighter",
      larger: false,
    },
  ];

  function updatePage(string) {
    if (string === "prev") {
      page--;
    }

    if (string === "next") {
      page++;
    }
  }

  const new_image = () => {
    const form = [
      {
        type: "file",
        label: "Add Image",
        id: "image",
      },
      {
        type: "submit",
        label: "Upload Image",
        onsubmit: async (event) => {
          const loading = event.currentTarget.id;
          const data = await getFormData(form);
          console.log(data);

          showLoading(loading);

          setTimeout(() => {
            hideLoading(loading);
          }, 2000);
        },
      },
    ];

    showModal("Add Image", { form });
  };
</script>

<Card px={0} py={0} hide_overflow={true}>
  <CardHeader
    title="Gallery"
    px={2}
    buttons={[
      { icon: "arrowLeft", onclick: () => updatePage("prev") },
      { icon: "arrowRight", onclick: () => updatePage("next") },
    ]}
  />
  <Gallery {page} {images} grid="2x2" new_image={() => new_image()} {buttons} />
</Card>
