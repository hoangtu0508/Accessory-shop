// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReviewContract {
    uint256 public reviewCount;
    mapping(uint256 => Review) public reviews;

    event ReviewAdded(
        uint256 indexed reviewId,
        address indexed reviewer,
        uint256 indexed productId,
        uint256 rating,
        string content
    );

    struct Review {
        address reviewer;
        uint256 productId;
        uint256 rating;
        string content;
    }

    function addReview(
        uint256 _productId,
        uint256 _rating,
        string memory _content
    ) external {
        require(bytes(_content).length > 0, "Review content cannot be empty");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        reviewCount++;
        reviews[reviewCount] = Review(
            msg.sender,
            _productId,
            _rating,
            _content
        );

        emit ReviewAdded(
            reviewCount,
            msg.sender,
            _productId,
            _rating,
            _content
        );
    }

    function getReviewsByProductId(
        uint256 _productId
    ) external view returns (Review[] memory) {
        uint256 count = 0;
        // Đếm số lượng đánh giá thuộc về sản phẩm
        for (uint256 i = 1; i <= reviewCount; i++) {
            if (reviews[i].productId == _productId) {
                count++;
            }
        }

        // Tạo mảng để lưu trữ đánh giá thuộc về sản phẩm
        Review[] memory productReviews = new Review[](count);
        uint256 index = 0;

        // Lặp lại và lưu trữ đánh giá thuộc về sản phẩm vào mảng
        for (uint256 i = 1; i <= reviewCount; i++) {
            if (reviews[i].productId == _productId) {
                productReviews[index] = reviews[i];
                index++;
            }
        }

        return productReviews;
    }
}
