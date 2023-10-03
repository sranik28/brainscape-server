import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICourse, ICourseFilters } from "./course.interface";
import Course from "./course.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import calculatePagination from "../../../helpers/paginationHelpers";
import { coursesSearchableFields } from "./course.constants";
import { SortOrder } from "mongoose";

const createCourseService = async (payload: ICourse): Promise<ICourse> => {
    const result = await Course.create(payload);
    return result;
};
const addSectionService = async (
    courseId: string,
    title: string
): Promise<ICourse> => {
    const ifExist = await Course.findById(courseId);
    if (!ifExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Course doesn't exist");
    }

    const result = (await Course.findByIdAndUpdate(
        courseId,
        {
            $push: {
                sections: {
                    section: title,
                    quiz: [],
                },
            },
        },
        { new: true }
    )) as ICourse;
    return result;
};

const removeSectionService = async (
    courseId: string,
    id: string
): Promise<ICourse> => {
    const ifExist = await Course.findById(courseId);
    if (!ifExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Course doesn't exist");
    }

    const result = (await Course.findByIdAndUpdate(
        courseId,
        {
            $pull: {
                quizzes: {
                    id: id,
                },
            },
        },
        { new: true }
    )) as ICourse;
    return result;
};

const getCourseService = async (id: string): Promise<ICourse> => {
    const result = await Course.findById(id);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Course doesn't exist");
    }

    return result;
};

const getCoursesService = async (
    filters: ICourseFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICourse[]>> => {
    const { searchTerm, ...filtersData } = filters;

    const { page, limit, skip, sortBy, sortOrder } =
        calculatePagination(paginationOptions);

    const andConditions = [];

    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: coursesSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }

    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    andConditions.push({
        status: "Public",
    });

    // Dynamic sort needs  fields to  do sorting
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    // If there is no condition , put {} to give all data
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Course.find(whereConditions)
        .select("-sections")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Course.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const updateCourseService = async (
    id: string,
    payload: Partial<ICourse>
): Promise<ICourse | null> => {
    const isExist = await Course.findById(id);

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Course not found!");
    }

    const result = await Course.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });

    if (!result) {
        return null;
    }

    return result.toObject();
};

export default {
    createCourseService,
    addSectionService,
    removeSectionService,
    getCourseService,
    getCoursesService,
    updateCourseService,
};
