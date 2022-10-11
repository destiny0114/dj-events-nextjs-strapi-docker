import slugify from "slugify";

export default {
  beforeCreate(event) {
    const { data } = event.params;

    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;
    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }
  },

  async afterUpdate(event) {
    // const { data } = event.params;
    // const { image } = event.result;
    // if (image) {
    //   const file = await strapi.plugins["upload"].services.upload.findOne(
    //     image.id
    //   );
    //   await strapi.plugins["upload"].services.upload.remove(file);
    // }
  },
};
