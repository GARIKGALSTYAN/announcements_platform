import { requestWithAuth, request } from "./requestWithAuth";
import type {
  Announcement,
  Category,
  City,
  Region,
  Tag,
  Image,
  User,
} from "common";

export function getOwnAnnouncements() {
  return requestWithAuth<Announcement.IAnnouncement[]>({
    method: "GET",
    path: "/my_announcement",
  });
}

export function createAnnouncement(
  args: Announcement.IAnnouncementCreateBodyArgs
) {
  return requestWithAuth<unknown>({
    method: "POST",
    path: "/announcement",
    body: args,
  });
}

export function loginRequest(args: User.ILoginBodyArgs) {
  return request<User.ILoginResult>({
    method: "POST",
    path: "/user/login",
    body: args,
  });
}

export function registerRequest(args: User.IRegisterBodyArgs) {
  return request({
    method: "POST",
    path: "/user",
    body: args,
  });
}

export function addTag(args: Tag.ITagCreateBodyArgs) {
  return requestWithAuth<Tag.ITag>({
    method: "POST",
    path: "/tag",
    body: args,
  });
}

export function addCategory(args: Category.ICategoryCreateBodyArgs) {
  return requestWithAuth<Category.ICategory>({
    method: "POST",
    path: "/category",
    body: args,
  });
}

export function addCity(args: City.ICityCreateBodyArgs) {
  return requestWithAuth<City.ICity>({
    method: "POST",
    path: "/city",
    body: args,
  });
}

export function addRegion(args: Region.IRegionCreateBodyArgs) {
  return requestWithAuth<Region.IRegion>({
    method: "POST",
    path: "/region",
    body: args,
  });
}

export function getCities() {
  return requestWithAuth<City.ICity[]>({
    method: "GET",
    path: "/city",
  });
}

export function getRegions() {
  return requestWithAuth<Region.IRegion[]>({
    method: "GET",
    path: "/region",
  });
}

export function getTags() {
  return requestWithAuth<Tag.ITag[]>({
    method: "GET",
    path: "/tag",
  });
}

export function getCategories() {
  return requestWithAuth<Category.ICategory[]>({
    method: "GET",
    path: "/category",
  });
}

export function uploadImage(args: Image.IImageCreateBodyArgs) {
  return requestWithAuth<Image.IImage>({
    method: "POST",
    path: "/image",
    body: args,
  });
}

export function getAnnouncements(args: Announcement.IAnnouncementGetQueryArgs) {
  return request<Announcement.IAnnouncement[]>({
    method: "GET",
    path: "/announcement",
    params: args,
  });
}
