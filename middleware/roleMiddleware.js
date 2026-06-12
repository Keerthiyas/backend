const authorizeRoles = (...role) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!role.includes(req.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};

exports.authorizeRoles = authorizeRoles;