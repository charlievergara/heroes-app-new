import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from 'react-router'

interface Breadcrumb { 
    label:string;
    to:string;
}

interface Props{
    currentPage:string;
    breadcrumbs?:Breadcrumb[]
}

export const MainBreadCrumb = ({breadcrumbs = []}:Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {
            breadcrumbs.map(crumb =>(
              <div className="flex items-center" key={crumb.label}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link to={crumb.to}>{crumb.label}</Link>
                </BreadcrumbLink>
                </BreadcrumbItem>        
              </div>
            ))
        }
        {/* <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/components">{currentPage}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}