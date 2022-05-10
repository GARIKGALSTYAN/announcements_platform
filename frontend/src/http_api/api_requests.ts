import { requestWithAuth, request } from "./requestWithAuth";
import type {
  IAnnouncement,
  LoginResponse,
  LoginRequest,
  CreateCategoryRequest,
  CreateCityRequest,
  CreateRegionRequest,
  CreateTagRequest,
  ICategory,
  ICity,
  IRegion,
  ITag,
} from "common";

export function getOwnAnnouncements() {
  return requestWithAuth<IAnnouncement[]>({
    method: "GET",
    path: "/my_announcement",
  });
}

export function loginRequest(args: LoginRequest) {
  return request<LoginResponse>({
    method: "POST",
    path: "/user/login",
    body: args,
  });
}

export function addTag(args: CreateTagRequest) {
  return requestWithAuth<ITag>({
    method: "POST",
    path: "/tag",
    body: args,
  });
}

export function addCategory(args: CreateCategoryRequest) {
  return requestWithAuth<ICategory>({
    method: "POST",
    path: "/category",
    body: args,
  });
}

export function addCity(args: CreateCityRequest) {
  return requestWithAuth<ICity>({
    method: "POST",
    path: "/city",
    body: args,
  });
}

export function addRegion(args: CreateRegionRequest) {
  return requestWithAuth<IRegion>({
    method: "POST",
    path: "/region",
    body: args,
  });
}

export function getCities() {
  return requestWithAuth<ICity[]>({
    method: "GET",
    path: "/city",
  });
}

export function getRegions() {
  return requestWithAuth<IRegion[]>({
    method: "GET",
    path: "/region",
  });
}

export function getTags() {
  return requestWithAuth<ITag[]>({
    method: "GET",
    path: "/tag",
  });
}

export function getCategories() {
  return requestWithAuth<ICategory[]>({
    method: "GET",
    path: "/category",
  });
}
