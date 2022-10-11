/**
 * event controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::event.event",
  ({ strapi }) => ({
    async me(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.badRequest(null, [
          { message: "No authorization header was found" },
        ]);
      }

      const data = await strapi.db.query("api::event.event").findMany({
        where: {
          user: { id: user.id },
        },
        populate: ["user", "image"],
      });
      if (!data) {
        return ctx.notFound();
      }

      const res = await this.sanitizeOutput(data, ctx);
      return res;
    },

    async find(ctx) {
      const populateList = ["image", "user"];
      populateList.push(ctx.query.populate);
      ctx.query.populate = populateList.join(",");
      return await super.find(ctx);
    },

    async create(ctx) {
      ctx.request.body.data.user = ctx.state.user; // assign my user as owner
      return await super.create(ctx);
    },

    async update(ctx) {
      const { id } = ctx.params;
      const query = {
        filters: {
          id: id,
          user: { id: ctx.state.user.id },
        },
      };
      const events = await this.find({ query: query });
      if (!events.data || !events.data.length) {
        return ctx.unauthorized(`You can't update this entry`);
      }
      return await super.update(ctx);
    },

    async delete(ctx) {
      const { id } = ctx.params;
      const query = {
        filters: {
          id: id,
          user: { id: ctx.state.user.id },
        },
      };
      const events = await this.find({ query: query });
      if (!events.data || !events.data.length) {
        return ctx.unauthorized(`You can't delete this entry`);
      }
      return await super.delete(ctx);
    },
  })
);
