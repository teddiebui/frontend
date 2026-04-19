import { Link, useLocation } from "react-router";
import { Fragment } from "react";

import { getAdminBreadcrumbs } from "../lib/admin-navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function HeaderBreadcrumbs() {
    const location = useLocation();
    const breadcrumbs = getAdminBreadcrumbs(location.pathname);

    return (
        <Breadcrumb>
            <BreadcrumbList className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {breadcrumbs.map((breadcrumb, index) => {
                    const isCurrentPage = index === breadcrumbs.length - 1;

                    return (
                        <Fragment key={`${breadcrumb.label}-${index}`}>
                            <BreadcrumbItem>
                                {isCurrentPage ? (
                                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={breadcrumb.to ?? "/today-staff"}>{breadcrumb.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isCurrentPage ? <BreadcrumbSeparator /> : null}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}